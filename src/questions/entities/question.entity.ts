import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Question extends Document{
  @Prop()
  title: string;

  @Prop()
  description: string;
}

export const QuestionSchema= SchemaFactory.createForClass(Question)
