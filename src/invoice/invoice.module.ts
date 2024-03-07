import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RentSchema } from 'src/rent/entities/rent.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Invoice',
        schema: RentSchema
      }
    ])
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule { }