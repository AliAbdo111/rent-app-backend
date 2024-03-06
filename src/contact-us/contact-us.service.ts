import { Injectable } from '@nestjs/common';
import { CreateContactUsDto } from './dto/create-contact-us.dto';
import { UpdateContactUsDto } from './dto/update-contact-us.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ContactUs } from './entities/contact-us.entity';
import { Model } from 'mongoose';

@Injectable()
export class ContactUsService {
  constructor(
    @InjectModel('ContactUs')
    private contactUsRepository?: Model<ContactUs>,
  ) {}

  async create(createContactUsDto: CreateContactUsDto) {
    return await this.contactUsRepository.create(createContactUsDto);
  }

  async findAll() {
    return await this.contactUsRepository.find();
  }

  async findOne(id: string) {
    return await this.contactUsRepository.findById(id);
  }

  update(id: number, updateContactUsDto: UpdateContactUsDto) {
    return this.contactUsRepository.findByIdAndUpdate(id, updateContactUsDto);
  }

  remove(id: number) {
    return `This action removes a #${id} contactUs`;
  }
}
