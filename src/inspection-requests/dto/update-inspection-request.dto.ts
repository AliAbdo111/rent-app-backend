import { PartialType } from '@nestjs/mapped-types';
import { CreateInspectionRequestDto } from './create-inspection-request.dto';
import { Status } from 'src/Types/Inspection';
import { IsEnum } from 'class-validator';

export class UpdateInspectionRequestDto extends PartialType(
  CreateInspectionRequestDto,
) {
  @IsEnum(Status)
  status: Status;
}
