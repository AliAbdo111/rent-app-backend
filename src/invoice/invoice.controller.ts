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
  Query,
  Req,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { IdQueryDto } from 'src/inspection-requests/dto/QueryDto';
import { AuthGuard } from 'src/auth/AuthGuard';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createInspectionRequestDto: CreateInvoiceDto) {
    await this.invoiceService.create(createInspectionRequestDto);
    return {
      success: true,
      status: 201,
      message: 'You Create invoice Successfuly',
    };
  }

  @Get()
  async findAll() {
    try {
      const inspectaion = await this.invoiceService.findAll();
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
      const invoice = await this.invoiceService.findByUser(sub);
      if (invoice.length < 0) {
        return {
          success: false,
          status: 404,
          message: 'Not Found Any invoice For This User ',
        };
      }
      return {
        success: true,
        status: 200,
        message: 'You Get invoice By User Id Successfuly',
        data: invoice,
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service invoice ${error}`,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get('/getByUnit')
  async getByUnit(@Query() query: IdQueryDto) {
    try {
      const invoice = await this.invoiceService.findByUnit(query.id);
      if (invoice.length === 0) {
        return {
          success: false,
          status: 404,
          message: 'Not Found Any invoice For This Unit ',
        };
      }
      return {
        success: true,
        status: 200,
        message: 'You Get invoice By Unit Id Successfuly',
        data: invoice,
      };
    } catch (erorr) {
      throw new ServiceUnavailableException(
        `Error From Service invoice ${erorr}`,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param() param: IdQueryDto,
    @Body() updateInspectionRequestDto: UpdateInvoiceDto,
  ) {
    try {
      const invoice = await this.invoiceService.update(
        param.id,
        updateInspectionRequestDto,
      );
      if (!invoice) {
        return {
          success: false,
          status: 400,
          message: 'Not Found  invoice',
        };
      }
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service invoice ${error}`,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param() param: IdQueryDto) {
    try {
      const invoice = await this.invoiceService.remove(param.id);
      if (!invoice) {
        return {
          success: false,
          status: 400,
          message: 'Not Found invoice',
        };
      }
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service invoice ${error}`,
      );
    }
  }
}
