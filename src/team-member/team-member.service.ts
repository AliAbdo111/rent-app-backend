import { Injectable } from '@nestjs/common';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamMember } from './entities/team-member.entity';

@Injectable()
export class TeamMemberService {
  constructor(
    @InjectModel('TeamMember')
    private teamMemberRepositoy: Model<TeamMember>,
  ) {}
  create(createTeamMemberDto: CreateTeamMemberDto) {
    return this.teamMemberRepositoy.create(createTeamMemberDto);
  }

  findAll() {
    return this.teamMemberRepositoy.find()
  }

  findOne(id: string) {
    return this.teamMemberRepositoy.findById(id);
  }

  update(id: string, updateTeamMemberDto: UpdateTeamMemberDto) {
    return this.teamMemberRepositoy.findByIdAndUpdate(id, updateTeamMemberDto)
  }

  remove(id: string) {
    return this.teamMemberRepositoy.findByIdAndDelete(id)
  }
}
