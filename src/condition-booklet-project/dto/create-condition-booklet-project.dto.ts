import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateConditionBookletProjectDto {
  @IsNotEmpty()
  @IsString()
  projectName: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  terms?: [{ itemNumber: string, title: string }];
}
