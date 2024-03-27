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
import { InvoiceModule } from './invoice/invoice.module';
import { RentModule } from './rent/rent.module';
import { RatingModule } from './rating/rating.module';
import { RequestRentingModule } from './request-renting/request-renting.module';
import { QuestionsModule } from './questions/questions.module';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TeamMemberModule } from './team-member/team-member.module';
import { NotificationService } from './services/notification/notification.service';
import { UploadImageService } from './services/upload-image/upload-image.service';
import { SendMailService } from './services/send-mail/send-mail.service';
import awsConfig from './config/aws.config';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      global: true,
    }),
    MulterModule.register({
      dest: '/upload',
    }),
    ConfigModule.forRoot({
      load: [awsConfig],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_CONNECTION_URL),
    CacheModule.register<any>({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      isGlobal: true,
    }),
    UsersModule,
    ConditionBookletOperationsModule,
    ConditionBookletProjectModule,
    RealEstateUnitModule,
    ContactUsModule,
    MaintenanceRealEstateModule,
    RealEstateOriginalUnitModule,
    RealEstateBookletUnitModule,
    InspectionRequestsModule,
    InvoiceModule,
    RentModule,
    RatingModule,
    RequestRentingModule,
    QuestionsModule,
    TeamMemberModule,
  ],

  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    AppService,
    PaymentService,
    NotificationService,
    UploadImageService,
    SendMailService,
  ],
})
export class AppModule {}
