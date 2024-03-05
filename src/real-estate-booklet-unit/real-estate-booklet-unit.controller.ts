import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RealEstateBookletUnitService } from './real-estate-booklet-unit.service';
import { CreateRealEstateBookletUnitDto } from './dto/create-real-estate-booklet-unit.dto';
import { UpdateRealEstateBookletUnitDto } from './dto/update-real-estate-booklet-unit.dto';

@Controller('real-estate-booklet-unit')
export class RealEstateBookletUnitController {
  constructor(private readonly realEstateBookletUnitService: RealEstateBookletUnitService) {}

  @Post()
  create(@Body() createRealEstateBookletUnitDto: CreateRealEstateBookletUnitDto) {
    return this.realEstateBookletUnitService.create(createRealEstateBookletUnitDto);
  }

  @Get()
  findAll() {
    return this.realEstateBookletUnitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.realEstateBookletUnitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRealEstateBookletUnitDto: UpdateRealEstateBookletUnitDto) {
    return this.realEstateBookletUnitService.update(+id, updateRealEstateBookletUnitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.realEstateBookletUnitService.remove(+id);
  }
}
