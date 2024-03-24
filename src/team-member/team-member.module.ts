import { Module } from '@nestjs/common';
import { TeamMemberService } from './team-member.service';
import { TeamMemberController } from './team-member.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamMemberScema } from './entities/team-member.entity';
import { CloudinaryService } from 'src/cloudinary/clodinary.service';

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
  providers: [TeamMemberService, CloudinaryService],
})
export class TeamMemberModule {}
