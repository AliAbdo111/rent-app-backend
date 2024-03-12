import { IsEnum, IsMongoId, IsNumber, IsString } from 'class-validator';

export class CreateInvoiceDto {

  @IsMongoId()
  unitId: string;

  @IsEnum(['RealEstateBookletUnit', 'RealEstateOriginalUnit'])
  modelRef: 'RealEstateBookletUnit' | 'RealEstateOriginalUnit';

  @IsString()
  invoiceType: string;

  invoiceImage: string;

  @IsString()
  userId: string;

  @IsNumber()
  amount: number;
}
