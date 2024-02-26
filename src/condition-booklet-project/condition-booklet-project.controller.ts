import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConditionBookletProjectService } from './condition-booklet-project.service';
import { CreateConditionBookletProjectDto } from './dto/create-condition-booklet-project.dto';
import { UpdateConditionBookletProjectDto } from './dto/update-condition-booklet-project.dto';

@Controller('condition-booklet-project')
export class ConditionBookletProjectController {
  constructor(
    private readonly conditionBookletProjectService: ConditionBookletProjectService,
  ) {}

  @Post()
  create(
    @Body() createConditionBookletProjectDto: CreateConditionBookletProjectDto,
  ) {
    return this.conditionBookletProjectService.create(
      createConditionBookletProjectDto,
    );
  }

  @Get()
  findAll() {
    try {
      return this.conditionBookletProjectService.findAll();
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.conditionBookletProjectService.findOne(id);
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConditionBookletProjectDto: UpdateConditionBookletProjectDto,
  ) {
    try {
      return this.conditionBookletProjectService.update(
        id,
        updateConditionBookletProjectDto,
      );
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.conditionBookletProjectService.removeProject(id);
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }
}
