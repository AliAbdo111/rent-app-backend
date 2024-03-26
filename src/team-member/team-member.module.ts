import { Module } from '@nestjs/common';
import { TeamMemberService } from './team-member.service';
import { TeamMemberController } from './team-member.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamMemberScema } from './entities/team-member.entity';
import { UploadImageService } from 'src/services/upload-image/upload-image.service';
@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: 'TeamMember',
        schema: TeamMemberScema,
      },
    ]),
  ],
  controllers: [TeamMemberController],
  providers: [TeamMemberService, UploadImageService],
})
export class TeamMemberModule {}
