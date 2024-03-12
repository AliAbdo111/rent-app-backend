import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RentSchema } from 'src/rent/entities/rent.entity';
import { AuthGuard } from 'src/auth/AuthGuard';
import { AuthModule } from 'src/auth/auth.module';
import { CloudinaryService } from 'src/cloudinary/clodinary.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { InvoiceSchema } from './entities/invoice.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Invoice',
        schema: InvoiceSchema,
      },
    ]),
    AuthModule,
    CloudinaryModule
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
