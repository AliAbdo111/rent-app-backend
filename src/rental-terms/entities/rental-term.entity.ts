import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class RentalTerm {
  @Prop()
  itemNumber: string;

  @Prop()
  title: string;

  @Prop()
  description: string;
}
export const RentalTermSchema = SchemaFactory.createForClass(RentalTerm);
