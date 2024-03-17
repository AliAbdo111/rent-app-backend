import { IsString } from "class-validator";

export class CreateRequestRentingDto {
    @IsString()
    fullName: string;
    @IsString()
    email: string;
  
    @IsString()
    phone: string;

    rearIdImage: string;
    
    frontIdImage: string;
}
