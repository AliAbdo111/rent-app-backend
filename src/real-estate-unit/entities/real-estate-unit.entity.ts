import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { StatusUnit, SubTypeUnit, TypeUnit } from 'src/Types/RealEstat';

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
  tenant: string; //المستأجر اللي عايز ياجر الشقه

  @Prop({
    type: Number,
    default: 0,
  })
  uintCode: number;

  @Prop({
    type: Number,
  })
  yearofconstruction: number;

  @Prop({
    type: String,
    enum: Object.values(TypeUnit),
    default: TypeUnit.HOUSING,
  })
  unitType: TypeUnit;

  @Prop({
    type: String,
    enum: Object.values(SubTypeUnit),
    default: SubTypeUnit.HOUSING,
  })
  unitSubType: SubTypeUnit;

  @Prop({
    type: String,
  })
  title: string;

  @Prop({
    type: String,
    enum: Object.values(StatusUnit),
  })
  status: StatusUnit;

  @Prop({
    type: String,
  })
  city: string;

  @Prop({
    type: String,
  })
  country: string;

  @Prop({
    type: String,
  })
  street: string;

  @Prop({
    type: Number,
  })
  buildingNumber: number;

  @Prop({
    type: Number,
  })
  floorNumber: number;

  @Prop({
    type: String,
  })
  finshingType: string;

  @Prop()
  facilities: string[]; // مرافق 

  @Prop({
    type: Number,
  })
  monthlyRentAmount: number;

  @Prop({
    type: Number,
  })
  annualRentAmount: number;

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
  video: string;

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
