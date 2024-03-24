import { IsNotEmpty } from "class-validator";

export class CreateTeamMemberDto {
    
    image: string;

    @IsNotEmpty()
    fullName: string;
    @IsNotEmpty()
    jobDescription: string;
}
