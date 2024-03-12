import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class ContactUs {
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  email: string;
  @Prop()
  phone: string;
  @Prop()
  message: string;
}

export const ContactUsSchema = SchemaFactory.createForClass(ContactUs);
