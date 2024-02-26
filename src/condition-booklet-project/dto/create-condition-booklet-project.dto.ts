import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateConditionBookletProjectDto {
  @IsNotEmpty()
  @IsString()
  nameProject: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
