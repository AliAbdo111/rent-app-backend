import { IsNotEmpty } from 'class-validator';
import { ConditionBookletProject } from 'src/condition-booklet-project/entities/condition-booklet-project.entity';

export class CreateConditionBookletOperationDto {
  @IsNotEmpty()
  projectId: ConditionBookletProject;

  //   personalInfo

  firstName: string;
  lastName: string;
  phone: string;
  maritalStatus: string;
  idNumber: string;
  nationality: string;
  familyMembers: number;

  //   files needs
  bankAccountStatementFile: string;
  hrLetter: string;
  birthCertificate: string;
  MarriageCertificate: string;

  // data about order
  success?: boolean;

  orderId?: number;
}
