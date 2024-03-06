import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceRealEstateController } from './maintenance-real-estate.controller';
import { MaintenanceRealEstateService } from './maintenance-real-estate.service';

describe('MaintenanceRealEstateController', () => {
  let controller: MaintenanceRealEstateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaintenanceRealEstateController],
      providers: [MaintenanceRealEstateService],
    }).compile();

    controller = module.get<MaintenanceRealEstateController>(
      MaintenanceRealEstateController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
