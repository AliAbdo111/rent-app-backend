import { Test, TestingModule } from '@nestjs/testing';
import { ConditionBookletProjectController } from './condition-booklet-project.controller';
import { ConditionBookletProjectService } from './condition-booklet-project.service';

describe('ConditionBookletProjectController', () => {
  let controller: ConditionBookletProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConditionBookletProjectController],
      providers: [ConditionBookletProjectService],
    }).compile();

    controller = module.get<ConditionBookletProjectController>(
      ConditionBookletProjectController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
