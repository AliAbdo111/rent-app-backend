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
  modelRef: 'RealEstateOriginalUnit' | 'RealEstateBookletUnit';

  @IsNotEmpty()
  owner: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  finshingType: string;
  // @IsNumber()
  price: number;

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

  // @IsNumber()
  yearofconstruction?: number;
}
