//#region
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  ServiceUnavailableException,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ConditionBookletOperationsService } from './condition-booklet-operations.service';
import { CreateConditionBookletOperationDto } from './dto/create-condition-booklet-operation.dto';
import { UpdateConditionBookletOperationDto } from './dto/update-condition-booklet-operation.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/clodinary.service';
import { PaymentService } from 'src/services/payment/payment.service';
import { AuthGuard } from 'src/auth/AuthGuard';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { RealEstateBookletUnitService } from 'src/real-estate-booklet-unit/real-estate-booklet-unit.service';

@Controller('ConditionBookletOperation')
export class ConditionBookletOperationsController {
  // @Inject(ConditionBookletProjectService)
  // private readonly conditionProjectService: ConditionBookletProjectService;
  constructor(
    private readonly conditionBookletOperationsService: ConditionBookletOperationsService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly paymentService: PaymentService,
    private readonly userService: UsersService,
  ) { }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'bankAccountStatementFile', maxCount: 1 },
      { name: 'hrLetter', maxCount: 1 },
      { name: 'birthCertificate' },
      { name: 'MarriageCertificate', maxCount: 1 },
    ]),
  )
  async create(
    @Body()
    createConditionBookletOperationDto: CreateConditionBookletOperationDto,
    @UploadedFiles()
    files: {
      bankAccountStatementFile?: Express.Multer.File;
      hrLetter?: Express.Multer.File;
      birthCertificate?: Express.Multer.File[];
      MarriageCertificate?: Express.Multer.File;
    },
  ) {
    try {
      // get project related with operations
      const foldeName = 'BookeletUser';
      // bankAccountStatementFile uploade  ==1
      const bankAccountStatementFile = files?.bankAccountStatementFile
        ? await this.cloudinaryService.uploadImage(
            files?.bankAccountStatementFile[0],
            foldeName,
        )
        : '';
      // birthCertificate uploade 2
      const urlsBirth: {
        public_id: string;
        secure_url: string;
      }[] = files.birthCertificate
          ? await Promise.all(
            files.birthCertificate.map(
              async (
                imag,
              ): Promise<{ public_id: string; secure_url: string }> => {
                const { secure_url, public_id } =
                  await this.cloudinaryService.uploadImage(imag, foldeName);
                return { public_id, secure_url };
              },
            ),
          )
          : [];
      // MarriageCertificate ===3
      const MarriageCertificate = files?.MarriageCertificate
        ? await this.cloudinaryService.uploadImage(
          files?.MarriageCertificate[0],
          foldeName,
        )
        : '';
      // hrLetter upload ==4
      const hrLetter = files?.hrLetter
        ? await this.cloudinaryService.uploadImage(
          files?.hrLetter[0],
          foldeName,
        )
        : '';
      const operatinProject =
        await this.conditionBookletOperationsService.create({
          ...createConditionBookletOperationDto,
          success: false,
          bankAccountStatementFile: bankAccountStatementFile.secure_url,
          hrLetter: hrLetter.secure_url,
          birthCertificates: urlsBirth,
          MarriageCertificate: MarriageCertificate.secure_url,
        });
      return {
        success: true,
        status: 201,
        message: 'The Opration Created',
      };
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException(
        `Erorr In Service BookletOperations :  ${error}`,
      );
    }
  }

  @Get()
  findAll() {
    try {
      return this.conditionBookletOperationsService.findAll();
    } catch (error) {
      throw new ServiceUnavailableException(`Error : ${error}`);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.conditionBookletOperationsService.findOne(id);
    } catch (error) {
      throw new ServiceUnavailableException(`Erorr :  ${error}`);
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateConditionBookletOperationDto: UpdateConditionBookletOperationDto,
  ) {
    try {
      return this.conditionBookletOperationsService.update(
        +id,
        updateConditionBookletOperationDto,
      );
    } catch (error) {
      throw new ServiceUnavailableException(`Error :${error}`);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.conditionBookletOperationsService.remove(id);
    } catch (error) {
      throw new ServiceUnavailableException(`Error Message : ${error}`);
    }
  }
  @UseGuards(AuthGuard)
  @Post('paymentOperation')
  async paymentOperationBookelet(@Body() body: any, @Req() req: Request) {
    try {
      const { sub } = (req as any).decodedData
      const user = await this.userService.findOne(sub)
      if (!user) {
        return {
          success: false,
          status: 404,
          message: 'User Not Found'
        }
      }

      const operation = await this.conditionBookletOperationsService.findOne(
        body.operationId,
      );
      return {
        user,
        operation
      }
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Operation Booklet :${error}`,
      );
    }
  }
  // call back for payment operatin project booklet
  @Post('/CallpackPayment/operation')
  async callBack(@Query() query: any, @Body() body: any) {
    try {
      console.log(body);
      console.log(body?.obj?.id); //TRANSACTION_ID
      console.log(body?.obj?.success);
      console.log(body?.obj?.pending);
      console.log(body?.obj?.order.id);
      console.log(query); //hmac
      const project =
        await this.conditionBookletOperationsService.getOperationByOrderID(
          body?.obj?.order.id,
          body?.obj?.success,
          body?.obj?.pending,
          body?.obj?.id,
        );
      return project;
    } catch (error) {
      throw new ServiceUnavailableException(`Error : ${error}`);
    }
  }
}
//#endregion
