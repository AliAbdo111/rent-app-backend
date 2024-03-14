import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { InvoiceSchema } from './entities/invoice.entity';
import { PaymentService } from 'src/services/payment/payment.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Invoice',
        schema: InvoiceSchema,
      },
    ]),
    AuthModule,
    CloudinaryModule,
    UsersModule,
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService, PaymentService],
})
export class InvoiceModule {}
