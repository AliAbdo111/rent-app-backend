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
} from '@nestjs/common';
import { ConditionBookletOperationsService } from './condition-booklet-operations.service';
import { CreateConditionBookletOperationDto } from './dto/create-condition-booklet-operation.dto';
import { UpdateConditionBookletOperationDto } from './dto/update-condition-booklet-operation.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/clodinary.service';
import { PaymentService } from 'src/services/payment/payment.service';
import { ConditionBookletProjectService } from 'src/condition-booklet-project/condition-booklet-project.service';

@Controller('ConditionBookletOperation')
export class ConditionBookletOperationsController {
  // @Inject(ConditionBookletProjectService)
  // private readonly conditionProjectService: ConditionBookletProjectService;
  constructor(
    private readonly conditionBookletOperationsService: ConditionBookletOperationsService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly paymentService: PaymentService,
  ) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'bankAccountStatementFile', maxCount: 1 },
      { name: 'hrLetter', maxCount: 1 },
      { name: 'birthCertificate', maxCount: 1 },
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
      birthCertificate?: Express.Multer.File;
      MarriageCertificate?: Express.Multer.File;
    },
  ) {
    try {
      // get project related with operations
      const project = await this.conditionBookletOperationsService.getProject(
        createConditionBookletOperationDto.projectId,
      );
      //  send data user and project to maymnet service
      const responsePayment = await this.paymentService.firstStepPayment(
        project,
        createConditionBookletOperationDto,
      );
      const bankAccountStatementFile = await this.cloudinaryService.uploadImage(
        files?.bankAccountStatementFile[0],
      );
      const birthCertificate = await this.cloudinaryService.uploadImage(
        files?.birthCertificate[0],
      );
      const MarriageCertificate = await this.cloudinaryService.uploadImage(
        files?.MarriageCertificate[0],
      );
      const hrLetter = await this.cloudinaryService.uploadImage(
        files?.hrLetter[0],
      );

      const operatinProject =
        await this.conditionBookletOperationsService.create({
          ...createConditionBookletOperationDto,
          orderId: responsePayment._id,
          success: false,
          bankAccountStatementFile: bankAccountStatementFile.secure_url,
          hrLetter: hrLetter.secure_url,
          birthCertificate: birthCertificate.secure_url,
          MarriageCertificate: MarriageCertificate.secure_url,
        });
      return { 
        success: true,
        message: 'Pleas Switch User to The Url in responsePayment',
        responsePayment: responsePayment,
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Erorr In Service Payment:  ${error}`,
      );
    }
  }

  @Get()
  findAll() {
    return this.conditionBookletOperationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conditionBookletOperationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateConditionBookletOperationDto: UpdateConditionBookletOperationDto,
  ) {
    return this.conditionBookletOperationsService.update(
      +id,
      updateConditionBookletOperationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conditionBookletOperationsService.remove(id);
  }

  // call back for payment operatin project booklet 
  @Post('/CallpackPayment/operation')
  callBack(@Query() query: any) {
    try {
      console.log(query)
      const {id}= query;
      const project = await this.conditionBookletOperationsService.getOperationByOrderID(id)
    } catch (error) {
      throw new ServiceUnavailableException()
    }
  }
}
