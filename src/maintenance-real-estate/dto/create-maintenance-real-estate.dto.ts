import { IsDateString, IsISO8601, IsString } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class CreateMaintenanceRealEstateDto {

    @IsString()
    userId: User;
    @IsString()
    phone: string;
    @IsString()
    typeOfMalfunction: string;

  imgOfMalfunction: string;
  @IsString()
  description: string;

  bookingDate: string;
}
