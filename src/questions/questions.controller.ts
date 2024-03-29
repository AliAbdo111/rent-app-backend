import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ServiceUnavailableException,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    try {
      const question = await this.questionsService.create(createQuestionDto);
      return {
        success: true,
        status: 201,
        message: 'Question Created Successfuly',
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Question Is Say :${error}`,
      );
    }
  }

  @Get()
  async findAll(@Query() query: any) {
    try {
      const limit = parseInt(query.limit);

      const { data } = await this.questionsService.findAll(limit);
      return {
        success: true,
        status: 200,
        limit: limit,
        message: 'You Get All Questions Successfuly',
        data: data,
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Question Is Say :${error}`,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const question = await this.questionsService.findOne(id);
      if (!question) {
        return {
          success: false,
          status: 404,
          message: ' Question Not Found ',
        };
      }
      return {
        success: true,
        status: 200,
        message: 'You Get Question Successfuly',
        data: question,
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Question Is Say : ${error}`,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    try {
      const question = await this.questionsService.update(
        id,
        updateQuestionDto,
      );
      if (!question) {
        return {
          success: false,
          status: 404,
          message: ' Question Not Found ',
        };
      }
      return {
        success: true,
        status: 200,
        message: ' Update Question Successfuly',
        data: question,
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Question Is Say :${error}`,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const question = await this.questionsService.remove(id);
      if (!question) {
        return {
          success: false,
          status: 404,
          message: ' Question Not Found ',
        };
      }
      return {
        success: true,
        status: 200,
        message: 'Delete Question Successfuly',
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Is Say :${error}`,
      );
    }
  }
}
