import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ServiceUnavailableException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RentService } from './rent.service';
import { CreateRentDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';
import { AuthGuard } from 'src/auth/AuthGuard';
import { Request } from 'express';
import { IdQueryDto } from 'src/inspection-requests/dto/QueryDto';

@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) {}
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createRentDto: CreateRentDto) {
    try {
      const rent = await this.rentService.create(createRentDto);
      if (!rent) {
        return {
          success: false,
          status: 400,
          message: ' The Rent Not create'
        };
      }
      return {
        success: true,
        status: 201,
        message: ' The Rent Created Successfuly',
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Rentelly :${error}`,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const rents = await this.rentService.findAll();
      if (rents.length === 0) {
        return {
          success: false,
          status: 404,
          message: ' Not Found Any Rentlly Until Now ',
        }
      }
      return {
        success: true,
        status: 200,
        message: ' You Get All Rents Successfuly',
        data: rents
      }
    } catch (error) {
      throw new ServiceUnavailableException(`Error From Service Rent :${error}`)
    }
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const rent = await this.rentService.findOne(id);
      if (!rent) {
        return {
          success: false,
          status: 404,
          message: ' Not Found Any Rentlly With This Id ',
        };
      }
      return {
        success: true,
        status: 200,
        message: ' You Get Rent successfuly With This Id ',
        data: rent,
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Rent :${error}`,
      );
    }
  }
  @UseGuards(AuthGuard)
  @Get('myrent/ByUser')
  async findByUser(@Req() req: Request) {
    try {
      const { sub } = (req as any).decodedData;
      // const id = new ObjectId(sub);
      const rent = await this.rentService.findByUser(sub);
      if (rent.length === 0) {
        return {
          success: false,
          status: 404,
          message: ' Not Found Any Rentlly With This Id ',
        };
      }
      return {
        success: true,
        status: 200,
        message: ' You Get Rent successfuly With This Id ',
        data: rent,
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Rent :${error}`,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get('myrent/ByUnit/:id')
  async findByUnit(@Param() query: IdQueryDto) {
    try {
      const rent = await this.rentService.findByUnit(query.id);
      if (!rent) {
        return {
          success: false,
          status: 404,
          message: ' Not Found Any Rentlly With This Id ',
        };
      }
      return {
        success: true,
        status: 200,
        message: ' You Get Rent successfuly With This Id ',
        data: rent,
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Rent :${error}`,
      );
    }
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRentDto: UpdateRentDto) {
    try {
      const rent = await this.rentService.update(id, updateRentDto);
      if (!rent) {
        return {
          success: false,
          status: 404,
          message: ' Not Found Any Rentlly With This Id ',
        };
      }
      return {
        success: true,
        status: 200,
        message: ' You Update Rent successfuly With This Id ',
        data: rent,
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Rent Is :${error}`,
      );
    }
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const rent = await this.rentService.remove(id);
      if (!rent) {
        return {
          success: false,
          status: 404,
          message: ' Not Found Any Rentlly With This Id ',
        };
      }
      return {
        success: true,
        status: 204,
        message: ' You Delete Rent successfuly With This Id ',
      };
    } catch (error) {
      throw new ServiceUnavailableException(`Error From Service Is :${error}`)
    }
  }
}
