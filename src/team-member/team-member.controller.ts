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
  ) { }

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
      await this.teamMemberService.create({
        ...createTeamMemberDto,
        image: secure_url,
      });
      return{
        succes: true,
        status: 201,
        Message: 'You create Member Team Work Successfully',
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Is Say :${error}`,
      );
    }
  }

  @Get()
 async findAll() {
    try {
       const members= await this.teamMemberService.findAll();
       return{
        succes: true,
        status: 200,
        Message: "You Get All Members Team Work Successfully",
        data: members
       }

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
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateTeamMemberDto: UpdateTeamMemberDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    try {
      // const {secure_url}= image? await this.cloudnairyService.uploadImage(image,'teammember') :''
      await this.teamMemberService.update(id, updateTeamMemberDto);
      return{
        succes: true,
        status: 200,
        Message: 'You update  Member Team Work Successfully',
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Is Say :${error}`,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.teamMemberService.remove(id);
      return{
        succes: true,
        status: 200,
        Message: "You Delete  Member Team Work Successfully",
      };
    } catch (error) {
      throw new ServiceUnavailableException(`Error From Service Is Say :${error}`)
    }
  }
}
