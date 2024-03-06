import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
import { Status } from 'src/Types/RealEstat';

export class CreateRealEstateUnitDto {
  @IsString()
  title: string;
  @IsString()
  address: string;
  @IsString()
  finshingType: string;
  // @IsNumber()
  price: number;

  @IsEnum(Status)
  status: Status;

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
}
