import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ConditionBookletProject {
  @Prop({
    type: String,
  })
  nameProject: string;

  @Prop({
    type: String,
  })
  description: string;

  @Prop({
    type: Number,
  })
  price: number;
}
export const ConditionBookletProjectSchema = SchemaFactory.createForClass(
  ConditionBookletProject,
);