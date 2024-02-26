import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConditionBookletOperationsService } from './condition-booklet-operations.service';
import { CreateConditionBookletOperationDto } from './dto/create-condition-booklet-operation.dto';
import { UpdateConditionBookletOperationDto } from './dto/update-condition-booklet-operation.dto';

@Controller('condition-booklet-operations')
export class ConditionBookletOperationsController {
  constructor(
    private readonly conditionBookletOperationsService: ConditionBookletOperationsService,
  ) {}

  @Post()
  create(
    @Body()
    createConditionBookletOperationDto: CreateConditionBookletOperationDto,
  ) {
    return this.conditionBookletOperationsService.create(
      createConditionBookletOperationDto,
    );
  }

  @Get()
  findAll() {
    return this.conditionBookletOperationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conditionBookletOperationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateConditionBookletOperationDto: UpdateConditionBookletOperationDto,
  ) {
    return this.conditionBookletOperationsService.update(
      +id,
      updateConditionBookletOperationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conditionBookletOperationsService.remove(+id);
  }
}
