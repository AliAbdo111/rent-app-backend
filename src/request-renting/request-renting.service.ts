import { Injectable } from '@nestjs/common';
import { CreateRequestRentingDto } from './dto/create-request-renting.dto';
import { UpdateRequestRentingDto } from './dto/update-request-renting.dto';

@Injectable()
export class RequestRentingService {
  create(createRequestRentingDto: CreateRequestRentingDto) {
    return 'This action adds a new requestRenting';
  }

  findAll() {
    return `This action returns all requestRenting`;
  }

  findOne(id: number) {
    return `This action returns a #${id} requestRenting`;
  }

  update(id: number, updateRequestRentingDto: UpdateRequestRentingDto) {
    return `This action updates a #${id} requestRenting`;
  }

  remove(id: number) {
    return `This action removes a #${id} requestRenting`;
  }
}
