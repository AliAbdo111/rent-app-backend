import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class RealEstateUnit extends Document {
  @Prop()
  vendor: string;
  @Prop({
    type: Number,
    default: 0,
  })
  uintCode: number;

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
