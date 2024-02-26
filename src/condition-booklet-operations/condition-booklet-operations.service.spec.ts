import { Test, TestingModule } from '@nestjs/testing';
import { ConditionBookletOperationsService } from './condition-booklet-operations.service';

describe('ConditionBookletOperationsService', () => {
  let service: ConditionBookletOperationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConditionBookletOperationsService],
    }).compile();

    service = module.get<ConditionBookletOperationsService>(
      ConditionBookletOperationsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
