import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestRentingDto } from './create-request-renting.dto';

export class UpdateRequestRentingDto extends PartialType(
  CreateRequestRentingDto,
) {}
