import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceRealEstateService } from './maintenance-real-estate.service';

describe('MaintenanceRealEstateService', () => {
  let service: MaintenanceRealEstateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaintenanceRealEstateService],
    }).compile();

    service = module.get<MaintenanceRealEstateService>(
      MaintenanceRealEstateService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
