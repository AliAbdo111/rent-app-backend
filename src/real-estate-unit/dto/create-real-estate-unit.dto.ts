import { User } from 'src/users/entities/user.entity';

export class CreateRealEstateUnitDto {
  vendor: User;

  address: string;

  finshingType: string;

  price: number;

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
