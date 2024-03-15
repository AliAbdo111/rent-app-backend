import { IsString } from "class-validator";

export class CreateContractTermDto {
    @IsString()
    itemNumber: string

    @IsString()
    title: string;

    @IsString()
    description: string;
}
