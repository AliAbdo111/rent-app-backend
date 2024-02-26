import { PartialType } from '@nestjs/mapped-types';
import { CreateConditionBookletOperationDto } from './create-condition-booklet-operation.dto';

export class UpdateConditionBookletOperationDto extends PartialType(
  CreateConditionBookletOperationDto,
) {}
