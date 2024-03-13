import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum UserType {
  VENDOR = 'VENDOR',
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  USER = 'USER',
  MEDIATOR = 'MEDIATOR', //وسيط
}
@Schema()
export class User extends Document {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({
    type: String,
    enum: Object.values(UserType),
    default: UserType.USER,
  })
  user_type: UserType; //vendor /owner /admin /user /mediator

  @Prop({
    type: String,
    default:
      'https://res.cloudinary.com/dovighfuo/image/upload/v1709471656/realEstateUnite/download_rdxqap.png',
  })
  imageProfile: string;

  @Prop()
  email: string;
  @Prop()
  password: string;

  @Prop()
  phone: string;

  @Prop()
  bankAccountStatementFile: string;

  @Prop()
  criminalRecordFile: string;

  @Prop()
  cardNumber: string;

  @Prop({
    default: '',
  })
  location: string;

  @Prop({
    default: '',
  })
  city: string;

  @Prop({
    default: '',
  })
  state: string;

  @Prop({
    default: '',
  })
  country: string;

  @Prop({
    default: false,
  })
  IsActive: boolean;
}
export const UserSchema = SchemaFactory.createForClass(User);
