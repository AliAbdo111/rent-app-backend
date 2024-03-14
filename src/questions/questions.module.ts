import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionSchema } from './entities/question.entity';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: 'Question',
        schema: QuestionSchema
      }
    ])
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
