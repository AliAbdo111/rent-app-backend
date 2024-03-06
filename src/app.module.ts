import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { ConditionBookletOperationsModule } from './condition-booklet-operations/condition-booklet-operations.module';
import { ConditionBookletProjectModule } from './condition-booklet-project/condition-booklet-project.module';
import { PaymentService } from './services/payment/payment.service';
import { RealEstateUnitModule } from './real-estate-unit/real-estate-unit.module';
import { ContactUsModule } from './contact-us/contact-us.module';
import { MaintenanceRealEstateModule } from './maintenance-real-estate/maintenance-real-estate.module';
import { RealEstateOriginalUnitModule } from './real-estate-original-unit/real-estate-original-unit.module';
import { RealEstateBookletUnitModule } from './real-estate-booklet-unit/real-estate-booklet-unit.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { InspectionRequestsModule } from './inspection-requests/inspection-requests.module';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
    MulterModule.register({
      dest: '/upload',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    MongooseModule.forRoot(process.env.DATABASE_CONNECTION_URL),
    ConditionBookletOperationsModule,
    ConditionBookletProjectModule,
    RealEstateUnitModule,
    ContactUsModule,
    MaintenanceRealEstateModule,
    RealEstateOriginalUnitModule,
    RealEstateBookletUnitModule,
    InspectionRequestsModule,
  ],

  controllers: [AppController],
  providers: [AppService, PaymentService],
})
export class AppModule {}
