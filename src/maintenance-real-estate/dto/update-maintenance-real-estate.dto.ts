import { PartialType } from '@nestjs/mapped-types';
import { CreateMaintenanceRealEstateDto } from './create-maintenance-real-estate.dto';

export class UpdateMaintenanceRealEstateDto extends PartialType(
  CreateMaintenanceRealEstateDto,
) {
  status: string;
}
