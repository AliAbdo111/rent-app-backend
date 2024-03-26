import { IsEnum, IsNotEmpty } from 'class-validator';
import { MaritalStatus } from 'src/Types/RealEstat';

export class CreateConditionBookletOperationDto {
  @IsNotEmpty()
  unitId: string;

  @IsNotEmpty()
  projectId: string;

  @IsNotEmpty()
  userId: string;

  firstName: string;

  lastName: string;

  phone: string;

  @IsEnum(MaritalStatus)
  maritalStatus: string;

  idNumber: string;

  nationality: string;

  familyMembers: number;

  passportImage: string;

  rearIdImage: string;

  frontIdImage: string;

  //   files needs
  bankAccountStatementFile: string;

  hrLetter: string;

  birthCertificates?: {
    public_id: string;
    secure_url: string;
  }[];

  MarriageCertificate: string;

  status: string;

  // data about order payment
  success?: boolean;

  orderId?: number;
}
