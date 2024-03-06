//#region
import { Injectable } from '@nestjs/common';
import { CreateInspectionRequestDto } from './dto/create-inspection-request.dto';
import { UpdateInspectionRequestDto } from './dto/update-inspection-request.dto';
import { InspectionRequest } from './entities/inspection-request.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class InspectionRequestsService {
  constructor(
    @InjectModel('InspectionRequest')
    private readonly inspectionRepository: Model<InspectionRequest>,
  ) {}
  async create(_createInspectionRequestDto: CreateInspectionRequestDto) {
    return await this.inspectionRepository.create(_createInspectionRequestDto);
  }

  findAll(): Promise<InspectionRequest[] | null> {
    return this.inspectionRepository.find().populate('unitId').select('-__v');
  }

  findOne(id: string) {
    return this.inspectionRepository.findById(id);
  }

  async findInspectionByUser(id: string): Promise<InspectionRequest[] | null> {
    const userId = new ObjectId(id);
    return this.inspectionRepository
      .find(userId)
      .select('-__v')
      .populate('unitId');
  }

  async findByUnit(id: string): Promise<InspectionRequest[] | null> {
    return this.inspectionRepository
      .find({ unitId: id })
      .populate('userID')
      .select('-__v');
  }

  update(id: string, _updateInspectionRequestDto: UpdateInspectionRequestDto) {
    return this.inspectionRepository.findByIdAndUpdate(
      id,
      _updateInspectionRequestDto,
    );
  }

  remove(id: string) {
    return this.inspectionRepository.findByIdAndDelete(id);
  }
}
//#endregion
