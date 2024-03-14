import { Module } from '@nestjs/common';
import { RentService } from './rent.service';
import { RentController } from './rent.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RentSchema } from './entities/rent.entity';
import { UsersModule } from 'src/users/users.module';
import { PaymentService } from 'src/services/payment/payment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Rent',
        schema: RentSchema,
      },
    ]),
    UsersModule,
  ],
  controllers: [RentController],
  providers: [RentService, PaymentService],
})
export class RentModule {}
