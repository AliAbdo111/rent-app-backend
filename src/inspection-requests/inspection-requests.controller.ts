//#region
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ServiceUnavailableException,
  Req,
  Query,
} from '@nestjs/common';
import { InspectionRequestsService } from './inspection-requests.service';
import { CreateInspectionRequestDto } from './dto/create-inspection-request.dto';
import { UpdateInspectionRequestDto } from './dto/update-inspection-request.dto';
import { AuthGuard } from 'src/auth/AuthGuard';
import { Request } from 'express';
import { IdQueryDto } from './dto/QueryDto';

@Controller('inspection-requests')
export class InspectionRequestsController {
  constructor(
    private readonly inspectionRequestsService: InspectionRequestsService,
  ) {}

  @Post()
  async create(@Body() createInspectionRequestDto: CreateInspectionRequestDto) {
    await this.inspectionRequestsService.create(createInspectionRequestDto);
    return {
      success: true,
      status: 201,
      message: 'You Creatr Inspectaion Successfuly',
    };
  }

  @Get()
  async findAll() {
    try {
      const inspectaion = await this.inspectionRequestsService.findAll();
      return {
        success: true,
        status: 200,
        message: 'You Get All Inspectaion Successfuly',
        data: inspectaion,
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service InspectionRequest ${error}`,
      );
    }
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.inspectionRequestsService.findOne(id);
  // }

  @UseGuards(AuthGuard)
  @Get('/getInspectaionByUser')
  async getByUserId(@Req() req: Request) {
    try {
      const { sub } = (req as any).decodedData;
      const inspectaion =
        await this.inspectionRequestsService.findInspectionByUser(sub);
      if (inspectaion.length < 0) {
        return {
          success: false,
          status: 404,
          message: 'Not Found Any Inspecaion For This User ',
        };
      }
      return {
        success: true,
        status: 200,
        message: 'You Get Inspectaion BY User Id Successfuly',
        data: inspectaion,
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service InspectionRequest ${error}`,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get('/getByUnit')
  async getByUnit(@Query() query: IdQueryDto) {
    try {
      const inspectaion = await this.inspectionRequestsService.findByUnit(
        query.id,
      );
      if (inspectaion.length === 0) {
        return {
          success: false,
          status: 404,
          message: 'Not Found Any Inspecaion For This Unit ',
        };
      }
      return {
        success: true,
        status: 200,
        message: 'You Get Inspectaion BY Unit Id Successfuly',
        data: inspectaion,
      };
    } catch (erorr) {
      throw new ServiceUnavailableException(
        `Error From Service InspectionRequest ${erorr}`,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param() param: IdQueryDto,
    @Body() updateInspectionRequestDto: UpdateInspectionRequestDto,
  ) {
    return this.inspectionRequestsService.update(
      param.id,
      updateInspectionRequestDto,
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param() param: IdQueryDto) {
    try {
      const deleteInspect = await this.inspectionRequestsService.remove(
        param.id,
      );
      if (!deleteInspect) {
        return {
          success: false,
          status: 400,
          message: 'Not Found Real InspectionRequest',
        };
      }
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service InspectionRequest ${error}`,
      );
    }
  }
}
//#endregion
