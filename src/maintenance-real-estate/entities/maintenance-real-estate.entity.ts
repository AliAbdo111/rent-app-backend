import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
@Schema({ timestamps: true })
export class MaintenanceRequests {
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'User',
  })
  userId: string;

  @Prop()
  phone: string;

  @Prop()
  typeOfMalfunction: string;

  @Prop()
  imgOfMalfunction: string;

  @Prop()
  description: string;

  @Prop()
  bookingDate: string;

  @Prop()
  status: string;
}

export const MaintenanceRequestsSchema =
  SchemaFactory.createForClass(MaintenanceRequests);
