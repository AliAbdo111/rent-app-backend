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
  ){}
  async create(createRealEstateBookletUnitDto: CreateRealEstateBookletUnitDto) {
    return await this.unitBooklitRepository.create(
      createRealEstateBookletUnitDto,
    );
  }

  findAll() {
    return `This action returns all realEstateBookletUnit`;
  }

  async findOne(id: string) {
    return await this.unitBooklitRepository.findById(id)
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
    return await this.unitBooklitRepository.findByIdAndDelete(id)
  }

  async getLastUnit(): Promise<any[]> {
    try {
      return this.unitBooklitRepository.find().sort({ createdAt: -1 }).limit(20);
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Unit Real Estate ${error}`,
      );
    }
  }
}
