import { IsNotEmpty } from 'class-validator';
import { SourceImage } from 'src/services/upload-image/upload-image.service';

export class CreateTeamMemberDto {
  image: SourceImage;

  @IsNotEmpty()
  fullName: string;
  @IsNotEmpty()
  jobDescription: string;
}
