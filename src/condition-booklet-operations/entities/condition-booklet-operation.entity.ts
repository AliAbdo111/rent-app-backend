import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Status } from 'src/Types/Inspection';
import { MaritalStatus } from 'src/Types/RealEstat';
import { ConditionBookletProject } from 'src/condition-booklet-project/entities/condition-booklet-project.entity';

@Schema({ timestamps: true })
export class ConditionBookletOperation {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ConditionBookletProject',
  })
  projectId: ConditionBookletProject;

  @Prop()
  fullName: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop({
    type: String,
    enum: Object.values(MaritalStatus),
  })
  maritalStatus: MaritalStatus;

  @Prop({
    type: String,
    enum: Object.values(Status),
    default: Status.WAITING,
  })
  status: string;

  @Prop()
  idNumber: string;

  @Prop()
  nationality: string;

  @Prop()
  familyMembers: number;

  @Prop()
  employmentType: string;
  //   files needs
  @Prop()
  bankAccountStatementFile: string;

  @Prop()
  hrLetter: string;

  @Prop({
    type: [
      {
        public_id: String,
        secure_url: String,
      },
    ],
  })
  birthCertificates: { public_id: string; secure_url: string }[];


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
