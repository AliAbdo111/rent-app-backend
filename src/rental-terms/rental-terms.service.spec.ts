import { Test, TestingModule } from '@nestjs/testing';
import { RentalTermsService } from './rental-terms.service';

describe('RentalTermsService', () => {
  let service: RentalTermsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RentalTermsService],
    }).compile();

    service = module.get<RentalTermsService>(RentalTermsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
