import { Module } from '@nestjs/common';
import { MaintenanceRealEstateService } from './maintenance-real-estate.service';
import { MaintenanceRealEstateController } from './maintenance-real-estate.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MaintenanceRequestsSchema } from './entities/maintenance-real-estate.entity';
import { CloudinaryService } from 'src/cloudinary/clodinary.service';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: 'MaintenanceRequests',
        schema: MaintenanceRequestsSchema
      }
    ])
  ],
  controllers: [MaintenanceRealEstateController],
  providers: [MaintenanceRealEstateService, CloudinaryService],
})
export class MaintenanceRealEstateModule {}
