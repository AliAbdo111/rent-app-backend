import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel('Invoice')
    private invoiceRepository: Model<Invoice>
  ){}
  create(createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceRepository.create(createInvoiceDto)
  }

  findAll() {
    return this.invoiceRepository.find();
  }

  findOne(id: string) {
    return this.invoiceRepository.findById(id);
  }
  findByUser(id: string) {
    return this.invoiceRepository.find({ userId: id });
  }

  findByUnit(id: string) {
    return this.invoiceRepository.find({ unitId: id });
  }
  update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceRepository.findByIdAndUpdate(id, updateInvoiceDto);
  }

  remove(id: string) {
    return this.invoiceRepository.findByIdAndDelete(id);
  }
}
