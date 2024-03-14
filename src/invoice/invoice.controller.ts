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
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { IdQueryDto } from 'src/inspection-requests/dto/QueryDto';
import { AuthGuard } from 'src/auth/AuthGuard';
import { CloudinaryService } from 'src/cloudinary/clodinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaymentService } from 'src/services/payment/payment.service';
import { UsersService } from 'src/users/users.service';
import { Request, Response } from 'express';

@Controller('invoice')
export class InvoiceController {
  constructor(
    private clooudinaryService: CloudinaryService,
    private readonly invoiceService: InvoiceService,
    private readonly paymentService: PaymentService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createInvoiceDto: CreateInvoiceDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    try {
      const { secure_url } = await this.clooudinaryService.uploadImage(
        image,
        'Invoice',
      );
      createInvoiceDto.invoiceImage = secure_url;
      await this.invoiceService.create(createInvoiceDto);
      return {
        success: true,
        status: 201,
        message: 'You Create invoice Successfuly',
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Invoice Service Is ${error}`,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Post('payInvoice')
  async payInvoice(
    @Body() body: any,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const { sub } = (req as any).decodedData;
      const invoice = await this.invoiceService.findOne(body.invoiceId);
      const user = await this.usersService.findOne(sub);
      if (!user) {
        return res.status(404).json({
          success: false,
          status: 404,
          mesage: ' User Not Found ',
        });
      }
      const product = {
        price: invoice.amount,
      };
      const orderid = await this.paymentService.paymentByCard(product, user);
      res.status(404).json({
        success: true,
        status: 200,
        mesage: 'Please Redirecte User To The Url Sended !',
        data: orderid,
      });
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Invoice Is: ${error}`,
      );
    }
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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const invoice = await this.invoiceService.findOne(id);
      if (!invoice) {
        return {
          success: false,
          status: 404,
          message: 'Not Found Any invoice',
        };
      }
      return {
        success: true,
        status: 200,
        message: 'You Get invoice By Unit Id Successfuly',
        data: invoice,
      };
    } catch (error) {
      throw new ServiceUnavailableException(`Error From Service ${error}`);
    }
  }

  @UseGuards(AuthGuard)
  @Get('getInvoice/byUser')
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
  @Get('getInvoice/byUnit')
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
