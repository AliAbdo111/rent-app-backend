import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from 'src/auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/cloudinary/clodinary.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtService, CloudinaryService],
})
export class UsersModule {}
