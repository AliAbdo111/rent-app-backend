import { PartialType } from '@nestjs/mapped-types';
import { CreateRealEstateUnitDto } from './create-real-estate-unit.dto';

export class UpdateRealEstateUnitDto extends PartialType(
  CreateRealEstateUnitDto,
) {}
