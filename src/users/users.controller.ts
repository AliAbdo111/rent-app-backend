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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/clodinary.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // create user return=> access_token ande refresh token in cookie
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      const user = await this.usersService.findOneByEmail(createUserDto.email);
      if (user) {
        res.status(301).send({ message: 'Email is already in use.' });
      } else {
        const secureUrls = await Promise.all(
          files.map(async (file) => {
            try {
              const result = await this.cloudinaryService.uploadImage(file);
              return result.secure_url;
            } catch (error) {
              console.error(
                `Error uploading file: ${file.originalname}`,
                error,
              );
              return null;
            }
          }),
        );
        const { access_token, refresh_token } = await this.usersService.create({
          ...createUserDto,
          bankAccountStatementFile: secureUrls[0],
          criminalRecordFile: secureUrls[1],
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
          filsUrl: secureUrls,
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
    const { refresh_token, access_token } = await this.usersService.signIn(
      signInDto.email,
      signInDto.password,
    );

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.send({ access_token: access_token });
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

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const user = await this.usersService.findOne(id);
      if (!user) {
        res.status(404).send(`not found user with id ${id}`);
      } else {
        res.status(200).send(user);
      }
    } catch (error) {
      res.status(500).send('server error happned');
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    try {
      const updateUser = await this.usersService.update(id, updateUserDto);
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
