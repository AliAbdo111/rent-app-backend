import { IsMongoId, IsNotEmpty } from 'class-validator';

export class IdQueryDto {
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}
