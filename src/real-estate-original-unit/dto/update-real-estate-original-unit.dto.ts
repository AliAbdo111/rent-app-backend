import { PartialType } from '@nestjs/mapped-types';
import { CreateRealEstateOriginalUnitDto } from './create-real-estate-original-unit.dto';

export class UpdateRealEstateOriginalUnitDto extends PartialType(
  CreateRealEstateOriginalUnitDto,
) {}
