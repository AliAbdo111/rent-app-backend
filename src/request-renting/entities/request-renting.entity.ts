import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Status } from 'src/Types/Inspection';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class RequestRenting extends Document {
  @Prop({
    type: String,
    enum: Object.values(Status),
    default: Status.WAITING,
  })
  status: Status;

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
