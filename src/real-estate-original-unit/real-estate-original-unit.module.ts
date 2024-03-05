import { Module } from '@nestjs/common';
import { RealEstateOriginalUnitService } from './real-estate-original-unit.service';
import { RealEstateOriginalUnitController } from './real-estate-original-unit.controller';

@Module({
  controllers: [RealEstateOriginalUnitController],
  providers: [RealEstateOriginalUnitService],
})
export class RealEstateOriginalUnitModule {}
