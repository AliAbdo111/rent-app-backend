import { IsString } from "class-validator";

export class CreateRentalTermDto {
    @IsString()
    itemNumber: string

    @IsString()
    title: string;

    @IsString()
    description: string;
}
