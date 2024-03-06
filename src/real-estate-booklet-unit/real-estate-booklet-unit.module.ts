import { Module } from '@nestjs/common';
import { RealEstateBookletUnitService } from './real-estate-booklet-unit.service';
import { RealEstateBookletUnitController } from './real-estate-booklet-unit.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RealEstateBookletUnitSchema } from './entities/real-estate-booklet-unit.entity';
import { CloudinaryService } from 'src/cloudinary/clodinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'RealEstateBookletUnit', schema: RealEstateBookletUnitSchema },
    ]),
  ],
  controllers: [RealEstateBookletUnitController],
  providers: [RealEstateBookletUnitService, CloudinaryService],
})
export class RealEstateBookletUnitModule {}
