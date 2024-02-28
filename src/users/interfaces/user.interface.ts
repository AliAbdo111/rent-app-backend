import { Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;

  lastName: string;

  email: string;

  password: string;

  phone: string;
  cardNumber: string;
  // address: {
  //   location: string;
  //   city: string;
  //   state: string;
  //   country: string;
  // };
}
