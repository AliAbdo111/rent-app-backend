import { Module } from '@nestjs/common';
import { RentalTermsService } from './rental-terms.service';
import { RentalTermsController } from './rental-terms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RentalTermSchema } from './entities/rental-term.entity';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: 'RentalTerm',
        schema: RentalTermSchema
      }
    ])
  ],
  controllers: [RentalTermsController],
  providers: [RentalTermsService],
})
export class RentalTermsModule {}
