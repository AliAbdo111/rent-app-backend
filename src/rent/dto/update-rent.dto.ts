import { PartialType } from '@nestjs/mapped-types';
import { CreateRentDto } from './create-rent.dto';
import { IsBoolean } from 'class-validator';

export class UpdateRentDto extends PartialType(CreateRentDto) {
  @IsBoolean()
  paid: boolean;
}
