import { Module } from '@nestjs/common';
import { RequestRentingService } from './request-renting.service';
import { RequestRentingController } from './request-renting.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestRentingSchema } from './entities/request-renting.entity';
import { CloudinaryService } from 'src/cloudinary/clodinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'RequestRenting',
        schema: RequestRentingSchema,
      },
    ]),
  ],
  controllers: [RequestRentingController],
  providers: [RequestRentingService, CloudinaryService],
})
export class RequestRentingModule {}
