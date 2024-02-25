import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://Aliomran_11:Aliomran_11@bookstore.2p8vi6j.mongodb.net/rent-app',
    ),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
