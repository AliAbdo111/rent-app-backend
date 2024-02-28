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

  @Prop({
    default: 0,
  })
  orderId: number;
  @Prop({
    default: false,
  })
  success: boolean;
  @Prop({
    default: 0,
  })
  TRANSACTION_ID: number;
  @Prop({
    default: true,
  })
  pending: boolean;
}

export const conditionBookletOperationSchema = SchemaFactory.createForClass(
  ConditionBookletOperation,
);
