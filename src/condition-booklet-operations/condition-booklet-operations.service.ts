import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { CreateConditionBookletOperationDto } from './dto/create-condition-booklet-operation.dto';
import { UpdateConditionBookletOperationDto } from './dto/update-condition-booklet-operation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConditionBookletOperation } from './entities/condition-booklet-operation.entity';
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
    try {
      const operationproject = await this.conditionBookletOperation.create(
        createConditionBookletOperationDto,
      );
      operationproject.save();
      return operationproject;
    } catch (error) {
      throw new ServiceUnavailableException(`Error: ${error}`);
    }
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
    try {
      return await this.conditionBookletOperation.find();
    } catch (error) {
      throw new ServiceUnavailableException(error);
    }
  }

  async findOne(id: string): Promise<any> {
    try {
      return this.conditionBookletOperation.findOne({ _id: id });
    } catch (error) {
      throw new ServiceUnavailableException(error);
    }
  }

  async update(
    id: number,
    updateConditionBookletOperationDto: UpdateConditionBookletOperationDto,
  ): Promise<any> {
    try {
      return await this.conditionBookletOperation.findByIdAndUpdate(
        id,
        updateConditionBookletOperationDto,
      );
    } catch (error) {
      throw new ServiceUnavailableException(error);
    }
  }

  remove(id: string) {
    try {
      return this.conditionBookletOperation.findByIdAndDelete(id);
    } catch (error) {
      throw new ServiceUnavailableException(error);
    }
  }

  async getOperationByOrderID(
    id: number,
    success: boolean,
    pending: boolean,
    TRANSACTION_ID: number,
  ) {
    try {
      const updateOperation =
        await this.conditionBookletOperation.updateOne(
          { orderId: id },
          {
            success: success,
            TRANSACTION_ID: TRANSACTION_ID,
            pending: pending,
          },
        );
      console.log(updateOperation);
      return updateOperation;
    } catch (error) {
      throw new ServiceUnavailableException(error);
    }
  }
}
