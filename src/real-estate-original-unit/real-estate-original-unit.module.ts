import { Module } from '@nestjs/common';
import { RealEstateOriginalUnitService } from './real-estate-original-unit.service';
import { RealEstateOriginalUnitController } from './real-estate-original-unit.controller';
import { CloudinaryService } from 'src/cloudinary/clodinary.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RealEstateOriginalUnitSchema } from './entities/real-estate-original-unit.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'RealEstateOriginalUnit',
        schema: RealEstateOriginalUnitSchema,
      },
    ]),
  ],
  controllers: [RealEstateOriginalUnitController],
  providers: [RealEstateOriginalUnitService, CloudinaryService],
})
export class RealEstateOriginalUnitModule {}
