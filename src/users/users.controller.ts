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
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/AuthGuard';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { ObjectId } from 'mongodb';
import { UploadImageService } from 'src/services/upload-image/upload-image.service';

@Controller('users')
export class UsersController {
  folderName: string = 'User';
  constructor(
    private readonly usersService: UsersService,
    private readonly uploadImageService: UploadImageService,
    private authService: AuthService,
  ) {}

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
      if (!user) {
        let bankAccountStatementFileRes = { secure_url: '' };
        let criminalRecordFileRes = { secure_url: '' };

        if (files?.bankAccountStatementFile) {
          bankAccountStatementFileRes =
          await this.uploadImageService.upload(
            files?.bankAccountStatementFile.stream,
            files?.bankAccountStatementFile.originalname,
            'images-ejary',
            files?.bankAccountStatementFile.mimetype,
          );
        }
        if (files?.criminalRecordFile) {
          criminalRecordFileRes = await this.uploadImageService.upload(
            files?.criminalRecordFile.stream,
            files?.criminalRecordFile.originalname,
            'images-ejary',
            files?.criminalRecordFile.mimetype,
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
          // access_token: access_token,
        });
      } else if (user && user.IsActive) {
        //check is not acttive
        res.status(301).send({ message: 'Emil Is Already Used Before ' });
      } else {
        const payload = { sub: user._id, email: user.email };
        const access_token = await this.authService.genrateToken(payload);
        this.usersService.sendMail(user, access_token);
        res.status(301).send({
          status: 302,
          success: true,
          message:
            'Email requires verification. We have sent an email for this',
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'server error ' + error });
    }
  }

  // signin  return=> access_token ande refresh token in cookie
  @Post('/signIn')
  async signIn(@Body() signInDto: Record<string, any>, @Res() res: Response) {
    const { refresh_token, access_token, user, status, message } =
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
    if (status === 302) {
      return res.send({
        status: status,
        message: message,
      });
    }
    res.send({
      status: status,
      message: message,
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
    const oldRefreshToken = "'req.header['refresh_token']'";
    const newAccessToken =
      await this.usersService.refreshToken(oldRefreshToken);
    res.send(newAccessToken);
  }

  @Get()
  async findAll(@Res() res: Response, @Query() qeuery: any) {
    try {
      const limit = parseInt(qeuery.limit) || 10;
      const page = parseInt(qeuery.page) || 1;
      const users = await this.usersService.findAll(limit, page);
      res.status(200).send({
        success: true,
        users: users,
      });
    } catch (error) {
      res.status(500).send({
        message: 'server error',
      });
    }
  }

  @UseGuards(AuthGuard)
  @Get('/getProfile')
  async findOne(@Req() req: Request, @Res() res: Response) {
    try {
      const { sub } = (req as any).decodedData;
      const user = await this.usersService.findOne(sub);
      if (!user) {
        res.status(404).send({
          success: false,
          message: `not found user with id+${sub}`,
        });
      } else {
        res.status(200).send({
          _id: user._id,
          user_type: user.user_type,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          location: user.location,
          phone: user.phone,
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
      console.log(error);
      res.status(500).send('server error happned' + error);
    }
  }

  @UseGuards(AuthGuard)
  @Patch()
  @UseInterceptors(FileInterceptor('imageProfile'))
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() imageProfile: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const { sub } = (req as any).decodedData;
      const id = new ObjectId(sub);
      if (updateUserDto.password) {
        const salt = Number(process.env.SALT);
        const hash = await bcrypt.hash(updateUserDto.password, salt);
        updateUserDto.password = hash;
      }
      if (imageProfile) {
        var { secure_url } = await this.uploadImageService.upload(
          imageProfile.stream,
          imageProfile.originalname,
          'images-ejary',
          imageProfile.mimetype,
        );
      }
      const updateUser = await this.usersService.update(id, {
        ...updateUserDto,
        imageProfile: secure_url,
      });
      if (!updateUser.matchedCount) {
        res.status(404).send({
          success: false,
          message: `not found user with id +${id}`,
        });
      } else {
        res.status(200).send({
          success: true,
          message: 'user upadted successfully',
        });
      }
    } catch (error) {
      res.status(500).send('server error happned');
    }
  }

  @UseGuards(AuthGuard)
  @Delete()
  async remove(@Req() req: Request, @Res() res: Response) {
    try {
      const { sub } = (req as any).decodedData;
      const id = new ObjectId(sub);
      const result = await this.usersService.remove(sub);
      if (!result) {
        res.status(404).send({
          success: false,
          message: `not found user with id +${id}`,
        });
      } else {
        res.status(200).send({
          success: true,
          message: 'user deleted succesfully',
        });
      }
    } catch (error) {
      res.status(500).send('Internal server error' + error);
    }
  }

  @Get('/forgotPassword/:email')
  async forgotPassword(@Param('email') email: string, @Res() res: Response) {
    const result = await this.usersService.forgotPassword(email);
    if (!result) {
      res.status(404).send({
        succes: false,
        status: 404,
        message: 'Not Found user with  Email', //
      });
    } else {
      res.status(200).send({
        succes: true,
        status: 200,
        message: 'The mail Sended to User',
      });
    }
  }

  @Get('/resendmail/:email')
  async resendmail(@Param('email') email: string, @Res() res: Response) {
    const result = await this.usersService.resendmail(email);
    if (!result) {
      res.status(404).send({
        succes: false,
        status: 404,
        message: 'Not Found user with resendmail  Email', //
      });
    } else {
      res.status(200).send({
        succes: true,
        status: 200,
        message: 'The mail Sended  resendmail to User',
      });
    }
  }
}
