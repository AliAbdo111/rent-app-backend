import { PartialType } from '@nestjs/mapped-types';
import { CreateRealEstateBookletUnitDto } from './create-real-estate-booklet-unit.dto';

export class UpdateRealEstateBookletUnitDto extends PartialType(CreateRealEstateBookletUnitDto) {}
