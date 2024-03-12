import { Module } from '@nestjs/common';
import { RequestRentingService } from './request-renting.service';
import { RequestRentingController } from './request-renting.controller';

@Module({
  controllers: [RequestRentingController],
  providers: [RequestRentingService],
})
export class RequestRentingModule {}
