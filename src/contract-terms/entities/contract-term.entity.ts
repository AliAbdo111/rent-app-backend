import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ContractTerm {
  @Prop()
  itemNumber: string;

  @Prop()
  title: string;

  @Prop()
  description: string;
}
export const ContractTermSchema = SchemaFactory.createForClass(ContractTerm);
