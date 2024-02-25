import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
export class signInDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
