import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ConditionBookletProject {
  @Prop({
    type: String,
  })
  projectName: string;

  @Prop({
    type: String,
  })
  description: string;

  @Prop({
    type: Number,
  })
  price: number;

  @Prop()
  terms: [{ itemNumber: string; title: string }];
}
export const ConditionBookletProjectSchema = SchemaFactory.createForClass(
  ConditionBookletProject,
);
