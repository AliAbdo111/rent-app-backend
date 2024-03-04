import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateRealEstateUnitDto } from './dto/create-real-estate-unit.dto';
import { UpdateRealEstateUnitDto } from './dto/update-real-estate-unit.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RealEstateUnit } from './entities/real-estate-unit.entity';

@Injectable()
export class RealEstateUnitService {
  constructor(
    @InjectModel('RealEstateUnit')
    private realEstateRepository: Model<RealEstateUnit>, //interafce
  ) { }
  async create(createRealEstateUnitDto: CreateRealEstateUnitDto) {
    try {
      const lastDocument = await this.realEstateRepository
        .findOne()
        .sort({ uintCode: -1 })
        .exec();
      const newRealEstate = new this.realEstateRepository(
        createRealEstateUnitDto,
      );

      if (lastDocument) {
        newRealEstate.uintCode = lastDocument.uintCode + 1;
      } else {
        newRealEstate.uintCode = 1;
      }
      return newRealEstate.save();
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error RealEstateUnitService is :${error}`,
      );
    }
  }

  async findAll(): Promise<any[]> {
    try {
      return await this.realEstateRepository.find();
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error on RealEstateUnitService :${error}`,
      );
    }
  }

  async findOne(id: any): Promise<any> {
    try {
      const realEstateUnit = await this.realEstateRepository.findById({
        _id: id,
      });
      if (!realEstateUnit) {
        throw new NotFoundException('Real estate unit not found');
      }
      return realEstateUnit;
    } catch (error) {
      throw new ServiceUnavailableException(
        `Message Error on RealEstateUnitService Is :${error}`,
      );
    }
  }

  async getLastUnit(): Promise<any[]> {
    try {
      return this.realEstateRepository.find().sort({ createdAt: -1 }).limit(20);
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Unit Real Estate ${error}`,
      );
    }
  }

  async update(id: any, updateRealEstateUnitDto: UpdateRealEstateUnitDto) {
    try {
      return await this.realEstateRepository.findByIdAndUpdate(
        id,
        updateRealEstateUnitDto,
      );
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error Message  RealEstateUnitService : ${error}`,
      );
    }
  }

  async remove(id: any) {
    try {
      return await this.realEstateRepository.findByIdAndDelete(id);
    } catch (error) {
      throw new ServiceUnavailableException(
        `Erorr Message  RealEstateUnitService is :${error}`,
      );
    }
  }
}
