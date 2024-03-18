import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ConditionBookletProject } from 'src/condition-booklet-project/entities/condition-booklet-project.entity';
import { RealEstateUnit } from 'src/real-estate-unit/entities/real-estate-unit.entity';

@Schema()
export class RealEstateBookletUnit extends RealEstateUnit {
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'ConditionBookletProject',
  })
  projectId: ConditionBookletProject;
}

export const RealEstateBookletUnitSchema = SchemaFactory.createForClass(
  RealEstateBookletUnit,
);
