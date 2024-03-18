import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel('Question')
    private questionRepository: Model<Question>,
  ) {}
  create(createQuestionDto: CreateQuestionDto) {
    return this.questionRepository.create(createQuestionDto);
  }

  async findAll(limit: number) {

    const count = await this.questionRepository.find().countDocuments();
    if (!limit) {
      limit = count;
    }
    const data = await this.questionRepository
      .find()
      .limit(limit)
      .select('-__v');
    return { data: data };
  }

  findOne(id: string) {
    return this.questionRepository.findById(id);
  }

  update(id: string, updateQuestionDto: UpdateQuestionDto) {
    return this.questionRepository.findByIdAndUpdate(id, updateQuestionDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.questionRepository.findByIdAndDelete(id);
  }
}
