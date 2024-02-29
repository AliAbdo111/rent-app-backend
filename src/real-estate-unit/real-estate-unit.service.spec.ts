import { Test, TestingModule } from '@nestjs/testing';
import { RealEstateUnitService } from './real-estate-unit.service';

describe('RealEstateUnitService', () => {
  let service: RealEstateUnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RealEstateUnitService],
    }).compile();

    service = module.get<RealEstateUnitService>(RealEstateUnitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
