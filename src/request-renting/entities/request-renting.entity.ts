import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Status } from 'src/Types/Inspection';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class RequestRenting extends Document {
  @Prop({
    type: String,
  })
  fullName: string;

  @Prop()
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  phone: string;

  @Prop({
    type: String,
    enum: Object.values(Status),
    default: Status.WAITING,
  })
  status: string;

  @Prop({
    type: String,
  })
  frontIdImage: string;

  @Prop({
    type: String,
  })
  rearIdImage: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'RealEstateOriginalUnit',
  })
  unitId: Types.ObjectId;

  @Prop()
  idNumber: number;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'User',
  })
  userId: string;
}

export const RequestRentingSchema =
  SchemaFactory.createForClass(RequestRenting);
