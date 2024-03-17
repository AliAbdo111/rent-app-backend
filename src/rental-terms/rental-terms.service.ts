import { Injectable } from '@nestjs/common';
import { CreateRentalTermDto } from './dto/create-rental-term.dto';
import { UpdateRentalTermDto } from './dto/update-rental-term.dto';
import { Model } from 'mongoose';
import { RentalTerm } from './entities/rental-term.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RentalTermsService {
  constructor(
    @InjectModel('RentalTerm')
    private rentalTermsRepository: Model<RentalTerm>,
  ) {}
  create(createDto: CreateRentalTermDto) {
    return this.rentalTermsRepository.create(createDto);
  }

  async findAll() {
    const data = await this.rentalTermsRepository.find().select('-__v');
    return data;
  }

  findOne(id: string) {
    return this.rentalTermsRepository.findById(id);
  }

  update(id: string, updateDto: UpdateRentalTermDto) {
    return this.rentalTermsRepository.findByIdAndUpdate(id, updateDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.rentalTermsRepository.findByIdAndDelete(id);
  }
}
