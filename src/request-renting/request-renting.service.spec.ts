import { Test, TestingModule } from '@nestjs/testing';
import { RequestRentingService } from './request-renting.service';

describe('RequestRentingService', () => {
  let service: RequestRentingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestRentingService],
    }).compile();

    service = module.get<RequestRentingService>(RequestRentingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
