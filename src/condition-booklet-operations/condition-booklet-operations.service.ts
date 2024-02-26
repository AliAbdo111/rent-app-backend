import { Injectable } from '@nestjs/common';
import { CreateConditionBookletOperationDto } from './dto/create-condition-booklet-operation.dto';
import { UpdateConditionBookletOperationDto } from './dto/update-condition-booklet-operation.dto';

@Injectable()
export class ConditionBookletOperationsService {
  create(
    createConditionBookletOperationDto: CreateConditionBookletOperationDto,
  ) {
    return 'This action adds a new conditionBookletOperation';
  }

  findAll() {
    return `This action returns all conditionBookletOperations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} conditionBookletOperation`;
  }

  update(
    id: number,
    updateConditionBookletOperationDto: UpdateConditionBookletOperationDto,
  ) {
    return `This action updates a #${id} conditionBookletOperation`;
  }

  remove(id: number) {
    return `This action removes a #${id} conditionBookletOperation`;
  }
}
