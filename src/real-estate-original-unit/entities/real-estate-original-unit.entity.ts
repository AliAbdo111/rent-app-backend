import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { RealEstateUnit } from 'src/real-estate-unit/entities/real-estate-unit.entity';
@Schema()
export class RealEstateOriginalUnit extends RealEstateUnit {
}
export const RealEstateOriginalUnitSchema =
  SchemaFactory.createForClass(RealEstateUnit);
