import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { CreateRealEstateOriginalUnitDto } from './dto/create-real-estate-original-unit.dto';
import { UpdateRealEstateOriginalUnitDto } from './dto/update-real-estate-original-unit.dto';
import { RealEstateOriginalUnit } from './entities/real-estate-original-unit.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RealEstateOriginalUnitService {
  constructor(
    @InjectModel('RealEstateOriginalUnit')
    private unitBooklitRepository: Model<RealEstateOriginalUnit>,
  ) {}
  async create(
    createRealEstateBookletUnitDto: CreateRealEstateOriginalUnitDto,
  ) {
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

  async findAll(
    limit: number,
    page: number,
  ): Promise<RealEstateOriginalUnit[]> {
    const skip = (page - 1) * limit;
    return await this.unitBooklitRepository
      .find()
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
    updateRealEstateOriginalUnitDto: UpdateRealEstateOriginalUnitDto,
  ) {
    return await this.unitBooklitRepository.findByIdAndUpdate(
      id,
      updateRealEstateOriginalUnitDto,
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
