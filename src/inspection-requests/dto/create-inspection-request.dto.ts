import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateInspectionRequestDto {
  @IsMongoId()
  @IsNotEmpty()
  unitId: string;

  modelRef: string;

  @IsMongoId()
  @IsNotEmpty()
  userID: string;

  @IsNotEmpty()
  inspectaionDate: Date;
}
