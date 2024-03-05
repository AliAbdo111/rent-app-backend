import { Injectable } from '@nestjs/common';
import { CreateRealEstateBookletUnitDto } from './dto/create-real-estate-booklet-unit.dto';
import { UpdateRealEstateBookletUnitDto } from './dto/update-real-estate-booklet-unit.dto';

@Injectable()
export class RealEstateBookletUnitService {
  create(createRealEstateBookletUnitDto: CreateRealEstateBookletUnitDto) {
    return 'This action adds a new realEstateBookletUnit';
  }

  findAll() {
    return `This action returns all realEstateBookletUnit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} realEstateBookletUnit`;
  }

  update(id: number, updateRealEstateBookletUnitDto: UpdateRealEstateBookletUnitDto) {
    return `This action updates a #${id} realEstateBookletUnit`;
  }

  remove(id: number) {
    return `This action removes a #${id} realEstateBookletUnit`;
  }
}
