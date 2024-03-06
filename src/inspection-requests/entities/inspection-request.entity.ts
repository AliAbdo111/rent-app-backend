import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { StatusInspection } from 'src/Types/Inspection';

@Schema({ timestamps: true })
export class InspectionRequest extends Document {
  @Prop({
    type: String,
    enum: Object.values(StatusInspection),
    default: StatusInspection.WAITING,
  })
  status: StatusInspection;

  @Prop()
  inspectaionDate: Date;

  @Prop({
    type: mongoose.Types.ObjectId,
    refPath: 'modelRef',
  })
  unitId: Types.ObjectId;

  @Prop({
    type: String,
    enum: ['RealEstateBookletUnit', 'RealEstateOriginalUnit'],
  })
  modelRef: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'User',
  })
  userID: string;
}
export const InspectionRequestSchema =
  SchemaFactory.createForClass(InspectionRequest);
