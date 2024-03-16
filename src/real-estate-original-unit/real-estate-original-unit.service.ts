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
    private unitOriginalRepository: Model<RealEstateOriginalUnit>,
  ) {}
  async create(
    createRealEstateBookletUnitDto: CreateRealEstateOriginalUnitDto,
  ) {
    try {
      const lastDocument = await this.unitOriginalRepository
        .findOne()
        .sort({ uintCode: -1 })
        .exec();
      const newRealEstate = new this.unitOriginalRepository(
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
        `Error RealEstate UnitService is :${error}`,
      );
    }
  }

  async findAll(
    limit: number,
    page: number,
  ): Promise<RealEstateOriginalUnit[]> {
    const skip = (page - 1) * limit;
    return await this.unitOriginalRepository
      .find({ IsAvilable: true })
      .skip(skip)
      .limit(limit)
      .select('-__v')
      .exec();
  } 

  async rentingUnit(id: string, update: UpdateRealEstateOriginalUnitDto) {
    return this.unitOriginalRepository.findByIdAndUpdate(id, update, {
      new: true,
    });
  }

  async findOne(id: string) {
    return await this.unitOriginalRepository.findById(id).select('-__v');
  }

  async update(
    id: string,
    updateRealEstateOriginalUnitDto: UpdateRealEstateOriginalUnitDto,
  ) {
    return await this.unitOriginalRepository.findByIdAndUpdate(
      id,
      updateRealEstateOriginalUnitDto,
    );
  }

  async remove(id: string) {
    return await this.unitOriginalRepository.findByIdAndDelete(id);
  }

  async getLastUnit(): Promise<any[]> {
    try {
      return this.unitOriginalRepository
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
