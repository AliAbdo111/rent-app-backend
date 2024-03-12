import { IsEnum, IsMongoId, IsNumber, IsString } from 'class-validator';

export class CreateRentDto {
  @IsMongoId()
  userId: string;

  @IsMongoId()
  unitId: string;

  @IsEnum(['RealEstateBookletUnit', 'RealEstateOriginalUnit'])
  modelRef: 'RealEstateBookletUnit' | 'RealEstateOriginalUnit';

  @IsString()
  month: string;

  @IsNumber()
  amount: number;
}
