import { Test, TestingModule } from '@nestjs/testing';
import { RealEstateOriginalUnitService } from './real-estate-original-unit.service';

describe('RealEstateOriginalUnitService', () => {
  let service: RealEstateOriginalUnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RealEstateOriginalUnitService],
    }).compile();

    service = module.get<RealEstateOriginalUnitService>(
      RealEstateOriginalUnitService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
