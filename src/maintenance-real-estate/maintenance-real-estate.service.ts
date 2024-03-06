import { Injectable } from '@nestjs/common';
import { CreateMaintenanceRealEstateDto } from './dto/create-maintenance-real-estate.dto';
import { UpdateMaintenanceRealEstateDto } from './dto/update-maintenance-real-estate.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MaintenanceRequests } from './entities/maintenance-real-estate.entity';

@Injectable()
export class MaintenanceRealEstateService {
  constructor(
    @InjectModel('MaintenanceRequests')
    private readonly maintenanceRepository: Model<MaintenanceRequests>,
  ) {}
  create(createMaintenanceRealEstateDto: CreateMaintenanceRealEstateDto) {
    return this.maintenanceRepository.create(createMaintenanceRealEstateDto);
  }

  findAll() {
    return this.maintenanceRepository.find();
  }

  findOne(id: string) {
    return this.maintenanceRepository.findById(id);
  }

  update(
    id: string,
    updateMaintenanceRealEstateDto: UpdateMaintenanceRealEstateDto,
  ) {
    return this.maintenanceRepository.findByIdAndUpdate(
      id,
      updateMaintenanceRealEstateDto,
    );
  }

  remove(id: string) {
    return this.maintenanceRepository.findByIdAndDelete(id);
  }
}
