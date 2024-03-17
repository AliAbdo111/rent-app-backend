import { Injectable } from '@nestjs/common';
import { CreateRequestRentingDto } from './dto/create-request-renting.dto';
import { UpdateRequestRentingDto } from './dto/update-request-renting.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestRenting } from './entities/request-renting.entity';

@Injectable()
export class RequestRentingService {
  constructor(
    @InjectModel('RequestRenting')
    private _requestesRepository: Model<RequestRenting>,
  ) {}
  create(createRequestRentingDto: CreateRequestRentingDto) {
    return this._requestesRepository.create(createRequestRentingDto);
  }

  async findAll(limit: number, page: number) {
    const skip = (page - 1) * limit;
    const requestes = await this._requestesRepository
      .find()
      .skip(skip)
      .limit(limit);
    const count = await this._requestesRepository.find().countDocuments();
    const pagesCount = Math.ceil(count / limit);
    return {
      pagesCount: pagesCount,
      requestes: requestes,
    };
  }

  findOne(id: string) {
    return this._requestesRepository.findById(id);
  }

  update(id: string, updateRequestRentingDto: UpdateRequestRentingDto) {
    return this._requestesRepository.findByIdAndUpdate(
      id,
      updateRequestRentingDto,
    );
  }

  remove(id: string) {
    return this._requestesRepository.findByIdAndDelete(id);
  }
}
