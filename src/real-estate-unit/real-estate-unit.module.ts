import { Module } from '@nestjs/common';
import { RealEstateUnitService } from './real-estate-unit.service';
import { RealEstateUnitController } from './real-estate-unit.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RealEstateUnitSchema } from './entities/real-estate-unit.entity';
import { CloudinaryService } from 'src/cloudinary/clodinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'RealEstateUnit', schema: RealEstateUnitSchema },
    ]),
  ],
  controllers: [RealEstateUnitController],
  providers: [RealEstateUnitService, CloudinaryService],
})
export class RealEstateUnitModule {}
