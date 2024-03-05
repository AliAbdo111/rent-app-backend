import { Injectable } from '@nestjs/common';
import { CreateRealEstateOriginalUnitDto } from './dto/create-real-estate-original-unit.dto';
import { UpdateRealEstateOriginalUnitDto } from './dto/update-real-estate-original-unit.dto';

@Injectable()
export class RealEstateOriginalUnitService {
  create(createRealEstateOriginalUnitDto: CreateRealEstateOriginalUnitDto) {
    return 'This action adds a new realEstateOriginalUnit';
  }

  findAll() {
    return `This action returns all realEstateOriginalUnit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} realEstateOriginalUnit`;
  }

  update(id: number, updateRealEstateOriginalUnitDto: UpdateRealEstateOriginalUnitDto) {
    return `This action updates a #${id} realEstateOriginalUnit`;
  }

  remove(id: number) {
    return `This action removes a #${id} realEstateOriginalUnit`;
  }
}
