import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { StatusUnit, TypeUnit } from 'src/Types/RealEstat';

export class CreateRealEstateUnitDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  owner: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNumber()
  @IsNotEmpty()
  buildingNumber: number;

  @IsNumber()
  @IsNotEmpty()
  floorNumber: number;

  @IsNotEmpty()
  @IsString()
  finshingType: string;

  // @IsNumber()
  monthlyRentAmount: number;

  annualRentAmount: number;

  @IsEnum(TypeUnit)
  @IsNotEmpty()
  unitType: TypeUnit;

  @IsNotEmpty()
  @IsEnum(StatusUnit)
  status: StatusUnit;

  // @IsNumber()
  countRoom: number;

  // @IsNumber()
  countBathRoom: number;

  UtilityMeters: string[]; //عدادات المرافق"كهربا","مياه","غاز"

  images: {
    public_id: string;
    secure_url: string;
  }[];
  @IsString()
  shortDescription: string;
  @IsString()
  longDescriprion: string;

  // @IsBoolean()
  hasAParcking: boolean;
  @IsString()
  space: string;
  @IsString()
  unitSubType: string;
  // @IsNumber()
  yearofconstruction?: number;
}
