import { Injectable } from '@nestjs/common';
import { CreateContractTermDto } from './dto/create-contract-term.dto';
import { UpdateContractTermDto } from './dto/update-contract-term.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ContractTerm } from './entities/contract-term.entity';

@Injectable()
export class ContractTermsService {
  constructor(
    @InjectModel('ContractTerm')
    private contractTermRepository: Model<ContractTerm>
  ) { }
  create(createDto: CreateContractTermDto) {
    return this.contractTermRepository.create(createDto);
  }

  async findAll() {
    const data = await this.contractTermRepository.find().select('-__v');
    return data

  }

  findOne(id: string) {
    return this.contractTermRepository.findById(id);
  }

  update(id: string, updateDto: UpdateContractTermDto) {
    return this.contractTermRepository.findByIdAndUpdate(id, updateDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.contractTermRepository.findByIdAndDelete(id)
  }
}
