import { Test, TestingModule } from '@nestjs/testing';
import { ConditionBookletProjectService } from './condition-booklet-project.service';

describe('ConditionBookletProjectService', () => {
  let service: ConditionBookletProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConditionBookletProjectService],
    }).compile();

    service = module.get<ConditionBookletProjectService>(
      ConditionBookletProjectService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
