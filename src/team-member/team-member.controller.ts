import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ServiceUnavailableException,
} from '@nestjs/common';
import { TeamMemberService } from './team-member.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  SourceImage,
  UploadImageService,
} from 'src/services/upload-image/upload-image.service';
import { ImageSource } from 'aws-sdk/clients/imagebuilder';

@Controller('team-member')
export class TeamMemberController {
  constructor(
    private readonly uploadImageService: UploadImageService,
    private readonly teamMemberService: TeamMemberService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createTeamMemberDto: CreateTeamMemberDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    try {
      const result = await this.uploadImageService.upload(
        image.stream,
        image.originalname,
        'images-ejary',
        image.mimetype,
      );

      await this.teamMemberService.create({
        ...createTeamMemberDto,
        image: result,
      });
      return {
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
      const members = await this.teamMemberService.findAll();
      return {
        succes: true,
        status: 200,
        Message: 'You Get All Members Team Work Successfully',
        data: members,
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Is Say :${error}`,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.teamMemberService.findOne(id);
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Is Say :${error}`,
      );
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
      const memberTeam = await this.teamMemberService.findOne(id);
      const imageRes = image
        ? await this.uploadImageService.update(
            image.stream,
            image.originalname,
            'images-ejary',
          )
        : memberTeam.image;
      await this.teamMemberService.update(id, {
        ...updateTeamMemberDto,
        image: imageRes as SourceImage,
      });
      return {
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
      return {
        succes: true,
        status: 200,
        Message: 'You Delete  Member Team Work Successfully',
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Is Say :${error}`,
      );
    }
  }
}
