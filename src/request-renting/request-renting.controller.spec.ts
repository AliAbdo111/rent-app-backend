import { Test, TestingModule } from '@nestjs/testing';
import { RequestRentingController } from './request-renting.controller';
import { RequestRentingService } from './request-renting.service';

describe('RequestRentingController', () => {
  let controller: RequestRentingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestRentingController],
      providers: [RequestRentingService],
    }).compile();

    controller = module.get<RequestRentingController>(RequestRentingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
