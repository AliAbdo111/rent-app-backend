import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
  password: string;

  @IsNotEmpty()
  user_type: string;
  
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  cardNumber: string;

  bankAccountStatementFile?: string;

  criminalRecordFile?: string;

  // address: {
  //   location: string;
  //   city: string;
  //   state: string;
  //   country: string;
  // };
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
