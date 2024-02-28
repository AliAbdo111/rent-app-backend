import { Module } from '@nestjs/common';
import { ConditionBookletOperationsService } from './condition-booklet-operations.service';
import { ConditionBookletOperationsController } from './condition-booklet-operations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryService } from 'src/cloudinary/clodinary.service';
import { conditionBookletOperationSchema } from './entities/condition-booklet-operation.entity';
import { PaymentService } from 'src/services/payment/payment.service';
import { ConditionBookletProjectModule } from 'src/condition-booklet-project/condition-booklet-project.module';
import { ConditionBookletProjectSchema } from 'src/condition-booklet-project/entities/condition-booklet-project.entity';

@Module({
  imports: [
    ConditionBookletProjectModule,
    MongooseModule.forFeature([
      {
        name: 'ConditionBookletOperation',
        schema: conditionBookletOperationSchema,
      },
      {
        name: 'ConditionBookletProject',
        schema: ConditionBookletProjectSchema,
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
