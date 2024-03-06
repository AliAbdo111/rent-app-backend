import { Module } from '@nestjs/common';
import { InspectionRequestsService } from './inspection-requests.service';
import { InspectionRequestsController } from './inspection-requests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InspectionRequestSchema } from './entities/inspection-request.entity';
import { AuthGuard } from 'src/auth/AuthGuard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'InspectionRequest',
        schema: InspectionRequestSchema,
      },
    ]),
  ],
  controllers: [InspectionRequestsController],
  providers: [InspectionRequestsService, AuthGuard, JwtService],
})
export class InspectionRequestsModule {}
