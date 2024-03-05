import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RealEstateOriginalUnitService } from './real-estate-original-unit.service';
import { CreateRealEstateOriginalUnitDto } from './dto/create-real-estate-original-unit.dto';
import { UpdateRealEstateOriginalUnitDto } from './dto/update-real-estate-original-unit.dto';

@Controller('real-estate-original-unit')
export class RealEstateOriginalUnitController {
  constructor(private readonly realEstateOriginalUnitService: RealEstateOriginalUnitService) {}

  @Post()
  create(@Body() createRealEstateOriginalUnitDto: CreateRealEstateOriginalUnitDto) {
    return this.realEstateOriginalUnitService.create(createRealEstateOriginalUnitDto);
  }

  @Get()
  findAll() {
    return this.realEstateOriginalUnitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.realEstateOriginalUnitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRealEstateOriginalUnitDto: UpdateRealEstateOriginalUnitDto) {
    return this.realEstateOriginalUnitService.update(+id, updateRealEstateOriginalUnitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.realEstateOriginalUnitService.remove(+id);
  }
}
