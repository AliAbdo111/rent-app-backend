import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RequestRentingService } from './request-renting.service';
import { CreateRequestRentingDto } from './dto/create-request-renting.dto';
import { UpdateRequestRentingDto } from './dto/update-request-renting.dto';

@Controller('request-renting')
export class RequestRentingController {
  constructor(private readonly requestRentingService: RequestRentingService) {}

  @Post()
  create(@Body() createRequestRentingDto: CreateRequestRentingDto) {
    return this.requestRentingService.create(createRequestRentingDto);
  }

  @Get()
  findAll() {
    return this.requestRentingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestRentingService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRequestRentingDto: UpdateRequestRentingDto,
  ) {
    return this.requestRentingService.update(+id, updateRequestRentingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestRentingService.remove(+id);
  }
}
