import { Injectable } from '@nestjs/common';
import { CreateConditionBookletProjectDto } from './dto/create-condition-booklet-project.dto';
import { UpdateConditionBookletProjectDto } from './dto/update-condition-booklet-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConditionBookletProject } from './entities/condition-booklet-project.entity';
import { IConditionBookletProject } from './interfaces/project.Bocklet.interface';
@Injectable()
export class ConditionBookletProjectService {
  constructor(
    @InjectModel('ConditionBookletProject')
    private projectRepository: Model<ConditionBookletProject>,
  ) {}

  async create(
    createConditionBookletProjectDto: CreateConditionBookletProjectDto,
  ): Promise<any> {
    return await this.projectRepository.create(
      createConditionBookletProjectDto,
    );
  }

  async findAll(): Promise<IConditionBookletProject[]> {
    return await this.projectRepository.find();
  }

  async findOne(id: string): Promise<IConditionBookletProject> {
    return await this.projectRepository.findOne({ _id: id });
  }

  async update(
    id: string,
    updateConditionBookletProjectDto: UpdateConditionBookletProjectDto,
  ) {
    return await this.projectRepository.findByIdAndUpdate(
      id,
      updateConditionBookletProjectDto,
    );
  }

  removeProject(id: string) {
    return this.projectRepository.findByIdAndDelete(id);
  }
}
