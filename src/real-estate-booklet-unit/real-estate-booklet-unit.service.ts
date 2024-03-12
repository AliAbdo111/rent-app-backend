import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { CreateRealEstateBookletUnitDto } from './dto/create-real-estate-booklet-unit.dto';
import { UpdateRealEstateBookletUnitDto } from './dto/update-real-estate-booklet-unit.dto';
import { Model } from 'mongoose';
import { RealEstateBookletUnit } from './entities/real-estate-booklet-unit.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RealEstateBookletUnitService {
  constructor(
    @InjectModel('RealEstateBookletUnit')
    private unitBooklitRepository: Model<RealEstateBookletUnit>,
  ) {}
  async create(createRealEstateBookletUnitDto: CreateRealEstateBookletUnitDto) {
    try {
      const lastDocument = await this.unitBooklitRepository
        .findOne()
        .sort({ uintCode: -1 })
        .exec();
      const newRealEstate = new this.unitBooklitRepository(
        createRealEstateBookletUnitDto,
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

  async findAll(limit: number, page: number): Promise<RealEstateBookletUnit[]> {
    const skip = (page - 1) * limit;
    return await this.unitBooklitRepository
      .find({ IsAvilable: true })
      .skip(skip)
      .limit(limit)
      .select('-__v')
      .exec();
  }

  async findOne(id: string) {
    return await this.unitBooklitRepository.findById(id).select('-__v');
  }

  async update(
    id: string,
    updateRealEstateBookletUnitDto: UpdateRealEstateBookletUnitDto,
  ) {
    return await this.unitBooklitRepository.findByIdAndUpdate(
      id,
      updateRealEstateBookletUnitDto,
    );
  }

  async remove(id: string) {
    return await this.unitBooklitRepository.findByIdAndDelete(id);
  }

  async getLastUnit(): Promise<any[]> {
    try {
      return this.unitBooklitRepository
        .find()
        .select('-__v')
        .sort({ createdAt: -1 })
        .limit(10);
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Unit Real Estate ${error}`,
      );
    }
  }
}
