import { Module } from '@nestjs/common';
import { ConditionBookletOperationsService } from './condition-booklet-operations.service';
import { ConditionBookletOperationsController } from './condition-booklet-operations.controller';

@Module({
  controllers: [ConditionBookletOperationsController],
  providers: [ConditionBookletOperationsService],
})
export class ConditionBookletOperationsModule {}
