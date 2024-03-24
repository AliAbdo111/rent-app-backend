import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, ServiceUnavailableException } from '@nestjs/common';
import { TeamMemberService } from './team-member.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/clodinary.service';

@Controller('team-member')
export class TeamMemberController {
  constructor(
    private readonly cloudnairyService: CloudinaryService,
    private readonly teamMemberService: TeamMemberService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createTeamMemberDto: CreateTeamMemberDto,
    @UploadedFile() image: Express.Multer.File,
    ) {
      try {
      const { secure_url } = await this.cloudnairyService.uploadImage(
        image,
        'teamMemeber',
      );
      console.log(secure_url);
      return await this.teamMemberService.create({
        ...createTeamMemberDto,
        image: secure_url,
      });
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Is Say :${error}`,
      );
    }
  }

  @Get()
  findAll() {
    try {
      return this.teamMemberService.findAll();

    } catch (error) {
      throw new ServiceUnavailableException(`Error From Service Is Say :${error}`)
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.teamMemberService.findOne(id);

    } catch (error) {
      throw new ServiceUnavailableException(`Error From Service Is Say :${error}`)
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTeamMemberDto: UpdateTeamMemberDto,
  ) {
    try {
      return this.teamMemberService.update(id, updateTeamMemberDto);

    } catch (error) {
      throw new ServiceUnavailableException(`Error From Service Is Say :${error}`)
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.teamMemberService.remove(id);

    } catch (error) {
      throw new ServiceUnavailableException(`Error From Service Is Say :${error}`)
    }
  }
}
