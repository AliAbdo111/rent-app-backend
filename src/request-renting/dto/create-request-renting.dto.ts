import { IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateRequestRentingDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  rearIdImage: string;

  frontIdImage: string;

  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsMongoId()
  @IsNotEmpty()
  unitId: string;

  // @IsEnum(['RealEstateBookletUnit', 'RealEstateOriginalUnit'])
  // @IsNotEmpty()
  // modelRef: string;
}
