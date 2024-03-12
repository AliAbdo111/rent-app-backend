import { Injectable } from '@nestjs/common';
import { CreateRentDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rent } from './entities/rent.entity';

@Injectable()
export class RentService {
  constructor(
    @InjectModel('Rent')
    private rentRepositroy: Model<Rent>,
  ) { }
  create(createRentDto: CreateRentDto) {
    return this.rentRepositroy.create(createRentDto);
  }

  findAll() {
    return this.rentRepositroy.find().select('-__v');
  }

  findOne(id: string) {
    return this.rentRepositroy.findById(id).select('-__v');
  }

  findByUser(id: string) {
    return this.rentRepositroy
      .find({ userId: id })
      .populate('unitId')
      .select('-__v');
  }

  findByUnit(id: string) {
    return this.rentRepositroy
      .find({ unitId: id })
      .populate('userId')
      .select('-__v');
  }

  update(id: string, updateRentDto: UpdateRentDto) {
    return this.rentRepositroy.findByIdAndUpdate(id, updateRentDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.rentRepositroy.findByIdAndDelete(id);
  }
}
