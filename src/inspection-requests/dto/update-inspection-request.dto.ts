import { PartialType } from '@nestjs/mapped-types';
import { CreateInspectionRequestDto } from './create-inspection-request.dto';
import { StatusInspection } from 'src/Types/Inspection';
import { IsEnum } from 'class-validator';

export class UpdateInspectionRequestDto extends PartialType(
  CreateInspectionRequestDto,
) {
  @IsEnum(StatusInspection)
  status: StatusInspection;
}
