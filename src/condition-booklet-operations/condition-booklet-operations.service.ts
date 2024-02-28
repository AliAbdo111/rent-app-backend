import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { CreateConditionBookletOperationDto } from './dto/create-condition-booklet-operation.dto';
import { UpdateConditionBookletOperationDto } from './dto/update-condition-booklet-operation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConditionBookletOperation } from './entities/condition-booklet-operation.entity';
import { ConditionBookletProjectService } from 'src/condition-booklet-project/condition-booklet-project.service';
import { ConditionBookletProject } from 'src/condition-booklet-project/entities/condition-booklet-project.entity';
import { PaymentService } from 'src/services/payment/payment.service';
// import { IConditionBookletProject } from './interfaces/ConditionBookletProject.inteface';

@Injectable()
export class ConditionBookletOperationsService {
  private readonly paymentService: PaymentService;

  constructor(
    @InjectModel('ConditionBookletOperation')
    private conditionBookletOperation: Model<ConditionBookletOperation>,
    @InjectModel('ConditionBookletOperation')
    private operationRepository?: Model<ConditionBookletOperation>,
    @InjectModel('ConditionBookletProject')
    private projectRepository?: Model<ConditionBookletProject>,
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

  async getProject(id: any) {
    try {
      const filter = { _id: id };
      const project = await this.projectRepository.findOne(filter);
      return project;
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException();
    }
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
