import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Req,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/clodinary.service';
import { AuthGuard } from 'src/auth/AuthGuard';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  folderName: string = 'User';
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) { }

  // create user return=> access_token ande refresh token in cookie
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'bankAccountStatementFile', maxCount: 1 },
      { name: 'criminalRecordFile', maxCount: 1 },
    ]),
  )
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
    @UploadedFiles()
    files: {
      bankAccountStatementFile?: Express.Multer.File;
      criminalRecordFile?: Express.Multer.File;
    },
  ) {
    try {
      const user = await this.usersService.findOneByEmail(createUserDto.email);
      if (user) {
        res.status(301).send({ message: 'Email is already in use.' });
      } else {
        let bankAccountStatementFileRes = { secure_url: '' };
        let criminalRecordFileRes = { secure_url: '' };

        if (files?.bankAccountStatementFile) {
          bankAccountStatementFileRes =
            await this.cloudinaryService.uploadImage(
              files.bankAccountStatementFile[0],
              this.folderName,
            );
        }
        if (files?.criminalRecordFile) {
          criminalRecordFileRes = await this.cloudinaryService.uploadImage(
            files.criminalRecordFile[0],
            this.folderName,
          );
        }

        const { access_token, refresh_token } = await this.usersService.create({
          ...createUserDto,
          bankAccountStatementFile: bankAccountStatementFileRes.secure_url,
          criminalRecordFile: criminalRecordFileRes.secure_url,
        });

        res.cookie('refresh_token', refresh_token, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
        });

        res.status(200).send({
          status: HttpStatus.CREATED,
          message: 'User created successfully.',
          access_token: access_token,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'server error' });
    }
  }

  // signin  return=> access_token ande refresh token in cookie
  @Post('/signIn')
  async signIn(@Body() signInDto: Record<string, any>, @Res() res: Response) {
    const { refresh_token, access_token, user } =
      await this.usersService.signIn(signInDto.email, signInDto.password);

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.send({
      access_token: access_token,
      user: {
        _id: user._id,
        user_type: user.user_type,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        location: user.location,
        city: user.city,
        state: user.state,
        country: user.country,
        cardNumber: user.cardNumber,
        bankAccountStatementFile: user.bankAccountStatementFile,
        criminalRecordFile: user.criminalRecordFile,
        imageProfile: user.imageProfile,
      },
    });
  }

  // refresh token
  @Post('/refresh')
  async refreshToken(@Res() res: Response, @Req() req: Request) {
    const oldRefreshToken = req.header['refresh_token'];
    const newAccessToken =
      await this.usersService.refreshToken(oldRefreshToken);
    res.send(newAccessToken);
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const users = await this.usersService.findAll();
      res.status(200).send({
        users: users,
      });
    } catch (error) {
      res.status(500).send({
        message: 'server error',
      });
    }
  }

  // @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const user = await this.usersService.findOne(id);
      if (!user) {
        res.status(404).send(`not found user with id ${id}`);
      } else {
        res.status(200).send(
          {
            _id: user._id,
            user_type: user.user_type,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            location: user.location,
            city: user.city,
            state: user.state,
            country: user.country,
            cardNumber: user.cardNumber,
            bankAccountStatementFile: user.bankAccountStatementFile,
            criminalRecordFile: user.criminalRecordFile,
            imageProfile: user.imageProfile,
          });
      }
    } catch (error) {
      res.status(500).send('server error happned');
    }
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imageProfile'))
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() imageProfile: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      if (updateUserDto.password) {
        const salt = Number(process.env.SALT);
        const hash = await bcrypt.hash(updateUserDto.password, salt);
        updateUserDto.password = hash;
      }
      if (imageProfile) {
        var { secure_url } = await this.cloudinaryService.uploadImage(
          imageProfile,
          this.folderName,
        );
      }
      const updateUser = await this.usersService.update(id, {
        ...updateUserDto,
        imageProfile: secure_url,
      });
      if (!updateUser) {
        res.status(404).send(`not found user with id ${id}`);
      } else {
        res.status(200).send('user upadted successfully');
      }
    } catch (error) {
      res.status(500).send('server error happned');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.usersService.remove(id);
      if (!result) {
        res.status(404).send(`not found user with id+${id}`);
      } else {
        res.status(200).send('user deleted succesfully');
      }
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  }

  @Get('/forgotPassword/:email')
  async forgotPassword(@Param('email') email: string, @Res() res: Response) {
    const result = await this.usersService.forgotPassword(email);
    if (!result) {
      res.status(404).send({
        message: 'Not Found user with  Email',
      });
    } else {
      res.status(200).send({
        message: 'The mail Sended to User',
      });
    }
  }
}
