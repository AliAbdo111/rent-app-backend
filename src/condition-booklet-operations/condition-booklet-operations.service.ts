import { Injectable } from '@nestjs/common';
import { CreateConditionBookletOperationDto } from './dto/create-condition-booklet-operation.dto';
import { UpdateConditionBookletOperationDto } from './dto/update-condition-booklet-operation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConditionBookletOperation } from './entities/condition-booklet-operation.entity';
// import { IConditionBookletProject } from './interfaces/ConditionBookletProject.inteface';

@Injectable()
export class ConditionBookletOperationsService {
  constructor(
    @InjectModel('ConditionBookletOperation')
    private conditionBookletOperation: Model<ConditionBookletOperation>,
  ) {}
  async create(
    createConditionBookletOperationDto: CreateConditionBookletOperationDto,
  ): Promise<any> {
    const operationproject = await this.conditionBookletOperation.create(
      createConditionBookletOperationDto,
    );
    operationproject.save();
    return operationproject;
  }

  async findAll(): Promise<any> {
    return await this.conditionBookletOperation.find();
  }

  async findOne(id: string): Promise<any> {
    return this.conditionBookletOperation.findOne({ _id: id });
  }

  async update(
    id: number,
    updateConditionBookletOperationDto: UpdateConditionBookletOperationDto,
  ): Promise<any> {
    return await this.conditionBookletOperation.findByIdAndUpdate(
      id,
      updateConditionBookletOperationDto,
    );
  }

  remove(id: string) {
    return this.conditionBookletOperation.findByIdAndDelete(id);
  }
}
