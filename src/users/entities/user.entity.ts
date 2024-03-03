import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';
import { Document } from 'mongoose';

enum UserType {
  Vendor = 'vendor',
  Owner = 'owner',
  Admin = 'admin',
  User = 'user',
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
    default: UserType.User,
  })
  user_type: UserType; //vendor /owner /admin /user

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
  cardNumber: number;

  // @Prop({
  //   type: {
  //     city: String,
  //     state: String,
  //     country: String,
  //   },
  // })
  // address: {
  //   city: string;
  //   state: string;
  //   country: string;
  // };

  async hashPass(): Promise<void> {
    if (this.password) {
      const saltRound = 10;
      this.password = await bcrypt.hash(this.password, saltRound);
    }
  }
}
export const UserSchema = SchemaFactory.createForClass(User);
