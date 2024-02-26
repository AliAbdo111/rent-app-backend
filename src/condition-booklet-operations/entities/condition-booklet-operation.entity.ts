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
  @Prop({
    type: {
      firstName: String,
      lastName: String,
      phone: String,
      countryCode: String,
      maritalStatus: String,
      idNumber: String,
      nationality: String,
      familyMembers: Number,
    },
  })
  personalInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    countryCode: string;
    maritalStatus: string;
    idNumber: string;
    nationality: string;
    familyMembers: number;
  };

  //   files needs
  @Prop()
  bankAccountStatementFile: string;

  @Prop()
  hrLetter: string;

  @Prop()
  birthCertificate: string;

  @Prop()
  MarriageCertificate: string;
}

export const conditionBookletOperationSchema = SchemaFactory.createForClass(
  ConditionBookletOperation,
);
