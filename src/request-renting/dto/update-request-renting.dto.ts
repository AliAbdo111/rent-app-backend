import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestRentingDto } from './create-request-renting.dto';
import { IsEnum } from 'class-validator';
import { Status } from 'src/Types/Inspection';

export class UpdateRequestRentingDto extends PartialType(
  CreateRequestRentingDto,
) {
  @IsEnum(Status)
  status: string
}
