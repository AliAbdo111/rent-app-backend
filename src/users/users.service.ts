import {
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { sendEmail } from 'src/utils/email.util';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../users/interfaces/user.interface';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private repositoryUsers: Model<User>,
    private authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = Number(process.env.SALT);
    const hash = await bcrypt.hash(createUserDto.password, salt);
    const newUser = await this.repositoryUsers.create({
      ...createUserDto,
      password: hash,
      location: '',
      city: '',
      state: '',
      country: '',
    });
    newUser.save();

    const payload = { sub: newUser._id, email: newUser.email };
    const access_token = await this.authService.genrateToken(payload);
    const refresh_token = await this.authService.generateRefreshToken(
      newUser._id,
    );
    await this.sendMail(newUser as User, access_token);
    return {
      access_token,
      refresh_token,
    };
  }

  async sendMail(newUser: User, access_token: string) {
    try {
      console.log(newUser)
      const emailSubject = 'Email verification';
      const emailText = `${process.env.BASE_URL}/auth/verfiy?key=${access_token}`;
      const mail = await sendEmail(
        newUser.email,
        emailSubject,
        emailText,
        newUser.firstName,
      );
    } catch (error) {
      throw new ServiceUnavailableException(`Error on Service Mail : ${error}`);
    }
  }

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string; user: any; refresh_token: string }> {
    const user = await this.repositoryUsers.findOne({ email: email });

    if (!user || !user.IsActive) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.email };
    const access_token = await this.authService.genrateToken(payload);
    const refresh_token = await this.authService.generateRefreshToken(user.id);

    return {
      user: user,
      refresh_token: refresh_token,
      access_token: access_token,
    };
  }

  async refreshToken(oldRefreshToken: string) {
    const userId = await this.authService.decodeRefreshToken(oldRefreshToken);
    console.log(userId);
    const newAccessToken = await this.authService.genrateToken(userId);
    return {
      newAccessToken: newAccessToken,
    };
    // const newRefreshToken = await this.authService.generateRefreshToken(userId);
  }

  async findAll(limit: number, page: number): Promise<User[]> {
    return await this.repositoryUsers
      .find()
      .skip((page - 1) * limit)
      .limit(limit);
  }

  async findOne(id: any): Promise<User> {
    return await this.repositoryUsers.findOne(id);
  }

  findOneByEmail(email: string): Promise<User> {
    return this.repositoryUsers.findOne({ email: email });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(_id: any, _updateUserDto: UpdateUserDto) {
    return this.repositoryUsers.updateOne({ _id: _id }, _updateUserDto);
  }

  async remove(id: any): Promise<any> {
    return this.repositoryUsers.deleteOne(id).exec();
  }

  async forgotPassword(email: string) {
    try {
      const user = await this.findOneByEmail(email);
      if (!user) {
        return false;
      } else {
        const access_token = await this.authService.genrateToken({
          sub: user._id,
          email: user.email,
        });
        const emailSubject = 'Password Reset Email';
        const emailText = `${process.env.BASE_URL}/forgotpassword?email=${user.email}&key=${access_token}`;
        const mail = await sendEmail(email, emailSubject, emailText);
        console.log(mail);
        return true;
      }
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }
}
