import { Test, TestingModule } from '@nestjs/testing';
import { RealEstateOriginalUnitController } from './real-estate-original-unit.controller';
import { RealEstateOriginalUnitService } from './real-estate-original-unit.service';

describe('RealEstateOriginalUnitController', () => {
  let controller: RealEstateOriginalUnitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RealEstateOriginalUnitController],
      providers: [RealEstateOriginalUnitService],
    }).compile();

    controller = module.get<RealEstateOriginalUnitController>(
      RealEstateOriginalUnitController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
