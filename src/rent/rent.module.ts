import { Module } from '@nestjs/common';
import { RentService } from './rent.service';
import { RentController } from './rent.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RentSchema } from './entities/rent.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Rent',
        schema: RentSchema,
      },
    ]),
  ],
  controllers: [RentController],
  providers: [RentService],
})
export class RentModule {}
