import { Test, TestingModule } from '@nestjs/testing';
import { ConditionBookletOperationsController } from './condition-booklet-operations.controller';
import { ConditionBookletOperationsService } from './condition-booklet-operations.service';

describe('ConditionBookletOperationsController', () => {
  let controller: ConditionBookletOperationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConditionBookletOperationsController],
      providers: [ConditionBookletOperationsService],
    }).compile();

    controller = module.get<ConditionBookletOperationsController>(
      ConditionBookletOperationsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
