import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Rent extends Document {
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'User',
  })
  userId: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    refPath: 'modelRef',
  })
  unitId: string;

  @Prop({
    type: String,
    enum: ['RealEstateBookletUnit', 'RealEstateOriginalUnit'],
  })
  modelRef: string;

  @Prop({
    type: String,
  })
  month: string;

  @Prop({
    type: Number,
  })
  amount: number;
}
export const RentSchema = SchemaFactory.createForClass(Rent);