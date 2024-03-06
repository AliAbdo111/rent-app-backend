import { Test, TestingModule } from '@nestjs/testing';
import { InspectionRequestsController } from './inspection-requests.controller';
import { InspectionRequestsService } from './inspection-requests.service';

describe('InspectionRequestsController', () => {
  let controller: InspectionRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InspectionRequestsController],
      providers: [InspectionRequestsService],
    }).compile();

    controller = module.get<InspectionRequestsController>(
      InspectionRequestsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
