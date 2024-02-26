import { Module } from '@nestjs/common';
import { ConditionBookletOperationsService } from './condition-booklet-operations.service';
import { ConditionBookletOperationsController } from './condition-booklet-operations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryService } from 'src/cloudinary/clodinary.service';
import { conditionBookletOperationSchema } from './entities/condition-booklet-operation.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'ConditionBookletOperation',
        schema: conditionBookletOperationSchema,
      },
    ]),
  ],
  controllers: [ConditionBookletOperationsController],
  providers: [ConditionBookletOperationsService, CloudinaryService],
})
export class ConditionBookletOperationsModule {}
