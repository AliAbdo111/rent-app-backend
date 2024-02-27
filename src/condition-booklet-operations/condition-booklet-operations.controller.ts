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
} from '@nestjs/common';
import { ConditionBookletOperationsService } from './condition-booklet-operations.service';
import { CreateConditionBookletOperationDto } from './dto/create-condition-booklet-operation.dto';
import { UpdateConditionBookletOperationDto } from './dto/update-condition-booklet-operation.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/clodinary.service';
import { PaymentService } from 'src/services/payment/payment.service';
import { ConditionBookletProjectService } from 'src/condition-booklet-project/condition-booklet-project.service';

@Controller('ConditionBookletOperation')
export class ConditionBookletOperationsController {
  constructor(
    private readonly conditionBookletOperationsService: ConditionBookletOperationsService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly paymentService: PaymentService,
    // private readonly conditionProjectService: ConditionBookletProjectService
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('file'))
  async create(
    @Body()
    createConditionBookletOperationDto: CreateConditionBookletOperationDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
 
    try { 
      // const project = await this.conditionProjectService.findOne(
      //   String(createConditionBookletOperationDto.projectId),
      // );
      // console.log(project)
      const responsePayment = await this.paymentService.firstStepPayment();

      return { responsePayment: responsePayment };
    } catch (error) {
      throw new ServiceUnavailableException('Erorr In Service Payment ')
    }
    const secureUrls = await Promise.all(
      files.map(async (file) => {
        try {
          const result = await this.cloudinaryService.uploadImage(file);
          return result.secure_url;
        } catch (error) {
          console.error(`Error uploading file: ${file.originalname}`, error);
          return null;
        }
      }),
    );
    return await this.conditionBookletOperationsService.create({
      ...createConditionBookletOperationDto,
      bankAccountStatementFile: secureUrls[0],
      hrLetter: secureUrls[1],
      birthCertificate: secureUrls[2],
      MarriageCertificate: secureUrls[3],
    });
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
}
