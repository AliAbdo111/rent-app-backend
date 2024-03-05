import { IsEnum } from 'class-validator';
import { Status } from 'src/Types/RealEstat';
import { User } from 'src/users/entities/user.entity';

export class CreateRealEstateUnitDto {
  // vendor: User;

  address: string;

  finshingType: string;

  price: number;

  @IsEnum(Status)
  status: Status;
  countRoom: number;

  countBathRoom: number;

  UtilityMeters: string[]; //عدادات المرافق"كهربا","مياه","غاز"

  images: {
    public_id: string;
    secure_url: string;
  }[];

  shortDescription: string;

  longDescriprion: string;

  hasAParcking: boolean;

  space: string;
}
