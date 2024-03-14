import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ServiceUnavailableException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { MaintenanceRealEstateService } from './maintenance-real-estate.service';
import { CreateMaintenanceRealEstateDto } from './dto/create-maintenance-real-estate.dto';
import { UpdateMaintenanceRealEstateDto } from './dto/update-maintenance-real-estate.dto';
import { CloudinaryService } from 'src/cloudinary/clodinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('maintenance-real-estate')
export class MaintenanceRealEstateController {
  constructor(
    private cloudniryService: CloudinaryService,
    private readonly maintenanceRealEstateService: MaintenanceRealEstateService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('imgOfMalfunction'))
  async create(
    @Body() createMaintenanceRealEstateDto: CreateMaintenanceRealEstateDto,
    @UploadedFile() imgOfMalfunction: Express.Multer.File,
  ) {
    const { secure_url } = await this.cloudniryService.uploadImage(
      imgOfMalfunction,
      'cloudniryService',
    );
    return this.maintenanceRealEstateService.create({
      ...createMaintenanceRealEstateDto,
      imgOfMalfunction: secure_url,
    });
  }

  @Get()
  async findAll() {
    try {
      return await this.maintenanceRealEstateService.findAll();
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service maintenanceRealEstateService is : ${error}`,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.maintenanceRealEstateService.findOne(id);
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service maintenanceRealEstateService is : ${error}`,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMaintenanceRealEstateDto: UpdateMaintenanceRealEstateDto,
  ) {
    try {
      return await this.maintenanceRealEstateService.update(
        id,
        updateMaintenanceRealEstateDto,
      );
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service maintenanceRealEstateService is : ${error}`,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.maintenanceRealEstateService.remove(id);
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service maintenanceRealEstateService is : ${error}`,
      );
    }
  }
}
