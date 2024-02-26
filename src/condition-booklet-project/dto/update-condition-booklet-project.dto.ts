import { PartialType } from '@nestjs/mapped-types';
import { CreateConditionBookletProjectDto } from './create-condition-booklet-project.dto';

export class UpdateConditionBookletProjectDto extends PartialType(
  CreateConditionBookletProjectDto,
) {}
