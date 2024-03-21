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
      .limit(limit)
      .select('-__v');
    const count = await this._requestesRepository.find().countDocuments();
    const pagesCount = Math.ceil(count / limit);
    return {
      pagesCount: pagesCount,
      requestes: requestes,
    };
  }

  findOne(id: string) {
    return this._requestesRepository.findById(id).select('-__v');
  }
  findByUser(id: string) {
    return this._requestesRepository
      .find({ userId: id })
      .populate('unitId')
      .select('-__v');
  }

  findByUnit(id: string) {
    const unitId = String(id);
    console.log(unitId);
    return this._requestesRepository
      .find({ unitId: unitId })
      .populate('userId')
      .select('-__v');
  }
  update(id: string, updateRequestRentingDto: UpdateRequestRentingDto) {
    return this._requestesRepository.findByIdAndUpdate(
      id,
      updateRequestRentingDto,
      { new: true },
    );
  }

  updateRequestStatus(id: string, status: string) {
    return this._requestesRepository.findByIdAndUpdate(
      id,
      {
        status: status,
      },
      { new: true },
    );
  }

  remove(id: string) {
    return this._requestesRepository.findByIdAndDelete(id);
  }
}
