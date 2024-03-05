import { Test, TestingModule } from '@nestjs/testing';
import { RealEstateBookletUnitService } from './real-estate-booklet-unit.service';

describe('RealEstateBookletUnitService', () => {
  let service: RealEstateBookletUnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RealEstateBookletUnitService],
    }).compile();

    service = module.get<RealEstateBookletUnitService>(RealEstateBookletUnitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
