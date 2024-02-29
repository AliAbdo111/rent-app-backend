import { Test, TestingModule } from '@nestjs/testing';
import { RealEstateUnitController } from './real-estate-unit.controller';
import { RealEstateUnitService } from './real-estate-unit.service';

describe('RealEstateUnitController', () => {
  let controller: RealEstateUnitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RealEstateUnitController],
      providers: [RealEstateUnitService],
    }).compile();

    controller = module.get<RealEstateUnitController>(RealEstateUnitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
