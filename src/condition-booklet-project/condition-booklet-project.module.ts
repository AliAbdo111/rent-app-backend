import { Module } from '@nestjs/common';
import { ConditionBookletProjectService } from './condition-booklet-project.service';
import { ConditionBookletProjectController } from './condition-booklet-project.controller';
import { ConditionBookletProjectSchema } from './entities/condition-booklet-project.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'ConditionBookletProject',
        schema: ConditionBookletProjectSchema,
      },
    ]),
  ],
  controllers: [ConditionBookletProjectController],
  providers: [ConditionBookletProjectService],
  exports: [ConditionBookletProjectService],
})
export class ConditionBookletProjectModule {}
