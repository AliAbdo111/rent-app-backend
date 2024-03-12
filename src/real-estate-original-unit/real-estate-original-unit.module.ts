import { Module } from '@nestjs/common';
import { RealEstateOriginalUnitService } from './real-estate-original-unit.service';
import { RealEstateOriginalUnitController } from './real-estate-original-unit.controller';
import { CloudinaryService } from 'src/cloudinary/clodinary.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RealEstateOriginalUnitSchema } from './entities/real-estate-original-unit.entity';
import { PaymentService } from 'src/services/payment/payment.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'RealEstateOriginalUnit',
        schema: RealEstateOriginalUnitSchema,
      },
    ]),
    UsersModule,
  ],
  controllers: [RealEstateOriginalUnitController],
  providers: [RealEstateOriginalUnitService, CloudinaryService, PaymentService],
})
export class RealEstateOriginalUnitModule {}
