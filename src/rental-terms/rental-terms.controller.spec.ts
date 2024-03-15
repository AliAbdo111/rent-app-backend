import { Test, TestingModule } from '@nestjs/testing';
import { RentalTermsController } from './rental-terms.controller';
import { RentalTermsService } from './rental-terms.service';

describe('RentalTermsController', () => {
  let controller: RentalTermsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentalTermsController],
      providers: [RentalTermsService],
    }).compile();

    controller = module.get<RentalTermsController>(RentalTermsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
