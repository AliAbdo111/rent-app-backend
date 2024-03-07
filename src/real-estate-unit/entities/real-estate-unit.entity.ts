import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Status, TypeUnit } from 'src/Types/RealEstat';

@Schema({ timestamps: true })
export class RealEstateUnit extends Document {
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'User',
  })
  owner: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'User',
  })
  rented: string; //مؤجر

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'User',
  })
  tenant: string; //مستأجر

  @Prop({
    type: Number,
    default: 0,
  })
  uintCode: number;

  @Prop({
    type: String,
    enum: Object.values(TypeUnit),
    default: TypeUnit.HOUSING,
  })
  unitType: TypeUnit;

  @Prop({
    type: String,
  })
  title: string;

  @Prop({
    type: String,
    enum: Object.values(Status),
  })
  status: Status;

  @Prop({
    type: String,
  })
  address: string;

  @Prop({
    type: String,
  })
  finshingType: string;

  @Prop({
    type: Number,
  })
  price: number;

  @Prop({
    type: Number,
    default: 0,
  })
  priceAfterDiscount: number;

  @Prop({
    type: Number,
  })
  countRoom: number;

  @Prop({
    type: Number,
  })
  countBathRoom: number;

  @Prop({
    type: [String],
  })
  UtilityMeters: string[]; //عدادت المرافق"كهربا","مياه","غاز"

  @Prop({
    type: [
      {
        public_id: String,
        secure_url: String,
      },
    ],
  })
  images: { asset_id: string; secure_url: string }[];

  @Prop({
    type: String,
  })
  shortDescription: string;

  @Prop({
    type: String,
  })
  longDescriprion: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  IsAvilable: boolean;

  @Prop({
    type: Boolean,
  })
  hasAParcking: boolean;

  @Prop({
    type: String,
  })
  space: string;
}
export const RealEstateUnitSchema =
  SchemaFactory.createForClass(RealEstateUnit);
