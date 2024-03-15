import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ServiceUnavailableException,
} from '@nestjs/common';
import { RentalTermsService } from './rental-terms.service';
import { CreateRentalTermDto } from './dto/create-rental-term.dto';
import { UpdateRentalTermDto } from './dto/update-rental-term.dto';

@Controller('rental-terms')
export class RentalTermsController {
  constructor(private readonly rentalTermsService: RentalTermsService) {}


  @Post()
  async create(@Body() createContractTermDto: CreateRentalTermDto) {
    try {
      const RentalTerm = await this.rentalTermsService.create(
        createContractTermDto,
      );
      return {
        success: true,
        status: 201,
        message: 'Rental Term Created Successfuly',
      }
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Rental Term Is Say :${error}`,
      );
    }
  }

  @Get()
  async findAll() {
    try {

      const data = await this.rentalTermsService.findAll();
      return {
        success: true,
        status: 200,
        message: 'You Get All Rental Terms Successfuly',
        data: data
      }
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Rental Terms Is Say :${error}`)
    }

  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const RentalTerms = await this.rentalTermsService.findOne(id);
      if (!RentalTerms) {
        return {
          success: false,
          status: 404,
          message: ' Rental Term Not Found '
        }
      }
      return {
        success: true,
        status: 200,
        message: 'You Get One Rental Term Successfuly',
        data: RentalTerms
      }
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Rental Terms Is Say : ${error}`,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateRentalTermDto,
  ) {
    try {
      const RentalTerms = await this.rentalTermsService.update(
        id,
        updateDto,
      );
      if (!RentalTerms) {
        return {
          success: false,
          status: 404,
          message: ' Rental Term Not Found ',
        }
      }
      return {
        success: true,
        status: 200,
        message: ' Rental Term Successfuly',
        data: RentalTerms
      }
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Rental Terms Is Say :${error}`,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const RentalTerm = await this.rentalTermsService.remove(id);
      if (!RentalTerm) {
        return {
          success: false,
          status: 404,
          message: ' Rental Term Not Found '
        }
      }
      return {
        success: true,
        status: 200,
        message: ' Rental Term Successfuly',
      }
    } catch (error) {
      throw new ServiceUnavailableException(`Error From Service Rental Terms Is Say :${error}`)
    }
  }
}
