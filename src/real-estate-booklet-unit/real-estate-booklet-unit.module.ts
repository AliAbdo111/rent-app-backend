import { Module } from '@nestjs/common';
import { RealEstateBookletUnitService } from './real-estate-booklet-unit.service';
import { RealEstateBookletUnitController } from './real-estate-booklet-unit.controller';

@Module({
  controllers: [RealEstateBookletUnitController],
  providers: [RealEstateBookletUnitService],
})
export class RealEstateBookletUnitModule {}
