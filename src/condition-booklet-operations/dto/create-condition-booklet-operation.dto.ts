import { IsEnum, IsNotEmpty } from 'class-validator';
import { MaritalStatus } from 'src/Types/RealEstat';
interface BirthCertificate {
  publicId: string;
  secure_url: string;
}
export class CreateConditionBookletOperationDto {
  @IsNotEmpty()
  unitId: string;
  
  @IsNotEmpty()
  price: number;

  firstName: string;

  lastName: string;

  phone: string;

  @IsEnum(MaritalStatus)
  maritalStatus: string;

  idNumber: string;

  nationality: string;

  familyMembers: number;

  //   files needs
  bankAccountStatementFile: string;

  hrLetter: string;

  birthCertificates?: {
    public_id: string;
    secure_url: string;
  }[];

  MarriageCertificate: string;

  // data about order
  success?: boolean;

  orderId?: number;
}
