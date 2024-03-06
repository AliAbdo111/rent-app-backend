import { Test, TestingModule } from '@nestjs/testing';
import { InspectionRequestsService } from './inspection-requests.service';

describe('InspectionRequestsService', () => {
  let service: InspectionRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InspectionRequestsService],
    }).compile();

    service = module.get<InspectionRequestsService>(InspectionRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
