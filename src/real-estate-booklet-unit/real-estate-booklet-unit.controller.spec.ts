import { Test, TestingModule } from '@nestjs/testing';
import { RealEstateBookletUnitController } from './real-estate-booklet-unit.controller';
import { RealEstateBookletUnitService } from './real-estate-booklet-unit.service';

describe('RealEstateBookletUnitController', () => {
  let controller: RealEstateBookletUnitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RealEstateBookletUnitController],
      providers: [RealEstateBookletUnitService],
    }).compile();

    controller = module.get<RealEstateBookletUnitController>(RealEstateBookletUnitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
