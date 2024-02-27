import { Module } from '@nestjs/common';
import { ConditionBookletOperationsService } from './condition-booklet-operations.service';
import { ConditionBookletOperationsController } from './condition-booklet-operations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryService } from 'src/cloudinary/clodinary.service';
import { conditionBookletOperationSchema } from './entities/condition-booklet-operation.entity';
import { PaymentService } from 'src/services/payment/payment.service';
import { ConditionBookletProjectService } from 'src/condition-booklet-project/condition-booklet-project.service';

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
  providers: [
    ConditionBookletOperationsService,
    CloudinaryService,
    PaymentService,
    
  ],
})
export class ConditionBookletOperationsModule {}
