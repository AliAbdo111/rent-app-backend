import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';
import { Document } from 'mongoose';
@Schema()
export class User extends Document{
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  user_type:string  //vendor /owner /admin 

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
