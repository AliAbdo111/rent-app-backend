import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ConditionBookletProject } from 'src/condition-booklet-project/entities/condition-booklet-project.entity';

@Schema()
export class ConditionBookletOperation {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ConditionBookletProject',
  })
  projectId: ConditionBookletProject;

  //   personalInfo
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;
  @Prop()
  email: string;
  @Prop()
  phone: string;
  @Prop()
  countryCode: string;
  @Prop()
  maritalStatus: string;
  @Prop()
  idNumber: string;
  @Prop()
  nationality: string;
  @Prop()
  familyMembers: number;

  //   files needs
  @Prop()
  bankAccountStatementFile: string;

  @Prop()
  hrLetter: string;

  @Prop()
  birthCertificate: string;

  @Prop()
  MarriageCertificate: string;

  @Prop()
  orderId: number;

  @Prop()
  success: boolean;
}

export const conditionBookletOperationSchema = SchemaFactory.createForClass(
  ConditionBookletOperation,
);
