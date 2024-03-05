import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { RealEstateUnit } from 'src/real-estate-unit/entities/real-estate-unit.entity';

@Schema()
export class RealEstateBookletUnit extends RealEstateUnit{

}

export const RealEstateBookletUnitSchema = SchemaFactory.createForClass(
  RealEstateBookletUnit,
);
