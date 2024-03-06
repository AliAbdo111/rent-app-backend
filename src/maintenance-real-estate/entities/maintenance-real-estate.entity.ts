import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/entities/user.entity';

@Schema({ timestamps: true })
export class MaintenanceRequests {
  @Prop()
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
