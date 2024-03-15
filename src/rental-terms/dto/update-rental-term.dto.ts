import { PartialType } from '@nestjs/mapped-types';
import { CreateRentalTermDto } from './create-rental-term.dto';

export class UpdateRentalTermDto extends PartialType(CreateRentalTermDto) {}
