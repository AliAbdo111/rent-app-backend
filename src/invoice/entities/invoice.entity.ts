import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Invoice extends Document {
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
  invoiceType: string;

  @Prop({
    type: String,
  })
  invoiceImage: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'User',
  })
  userId: string;

  @Prop({
    type: Number,
  })
  amount: number;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
