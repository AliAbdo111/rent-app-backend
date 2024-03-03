import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
  password: string;

  imageProfile?: string;

  user_type: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsNumber()
  @IsNotEmpty()
  cardNumber: number;

  bankAccountStatementFile?: string;

  criminalRecordFile?: string;
  
    address?: string;
    city?: string;
    state?: string;
    country?: string;
  
}
// انا في الريجيستر مش بحتاج غير
// firstName:"",
//   lastName:"",
//   email:"",
//   password:"",
//   confirmPassword:"",
//   phone:"",
//   cardNumber:"",
//   bankAccountStatementFile:"",
//   criminalRecordFile:""
