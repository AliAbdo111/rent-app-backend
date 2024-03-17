import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ServiceUnavailableException,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { RequestRentingService } from './request-renting.service';
import { CreateRequestRentingDto } from './dto/create-request-renting.dto';
import { UpdateRequestRentingDto } from './dto/update-request-renting.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CloudinaryService } from 'src/cloudinary/clodinary.service';

@Controller('rent-request')
export class RequestRentingController {
  folderName: string = 'rent-request';
  constructor(
    private cloudinaryService: CloudinaryService,
    private readonly requestRentingService: RequestRentingService){}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'frontIdImage', maxCount: 1 },
      { name: 'rearIdImage', maxCount: 1 },
    ]),
  )
  async create(
    @UploadedFiles()
    files: {
      frontIdImage: Express.Multer.File;
      rearIdImage: Express.Multer.File;
    },
    @Body() createRequestRentingDto: CreateRequestRentingDto,
  ) {
    try {
      console.log(files.frontIdImage)
      console.log(files.rearIdImage)
      const frontIdImage = await this.cloudinaryService.uploadImage(
        files.frontIdImage[0],
        this.folderName,
      );
      const rearIdImage = await this.cloudinaryService.uploadImage(
        files.rearIdImage[0],
        this.folderName,
      );
      console.log(frontIdImage)
      console.log(rearIdImage)
      const request = await this.requestRentingService.create(
        {...createRequestRentingDto,
        rearIdImage: rearIdImage.secure_url,
        frontIdImage: frontIdImage.secure_url,}
      );
      if (!request) {
        return {
          success: false,
          status: 404,
          message: 'Request Not Created',
        };
      }
      return {
        success: true,
        status: 201,
        message: 'Request Created Successfuly',
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Request Renting Is :${error}`,
      );
    }
  }

  @Get()
  async findAll(@Query() query: any) {
    try {
      const page = query.page || 1;
      const limit = query.page || 10;
      const { requestes, pagesCount } =
        await this.requestRentingService.findAll(page, limit);
      return {
        success: true,
        status: 200,
        message: 'You Get All Requestes Succefully',
        limit: limit,
        numberOfPages: page,
        pagsCount: pagesCount,
        data: requestes,
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Request Renting :${error}`,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const request = await this.requestRentingService.findOne(id);

      if (!request) {
        return {
          success: false,
          status: 404,
          message: 'ReQuest Not Found',
        };
      }

      return {
        success: true,
        status: 200,
        message: 'You Get Request  Successfully',
        data: request,
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Requestes renting :${error}`,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRequestRentingDto: UpdateRequestRentingDto,
  ) {
    try {
      const request = await this.requestRentingService.update(
        id,
        updateRequestRentingDto,
      );
      if (!request) {
        return {
          success: false,
          status: 404,
          message: 'Not Found Request With This Id ',
        };
      }
      return {
        success: true,
        status: 200,
        message: 'Request Updated Succesfuly With This Id ',
      };
    } catch (error) {
      throw new ServiceUnavailableException(`Error From Service Is : ${error}`)
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const request = await this.requestRentingService.remove(id);

      if (!request) {
        return {
          success: false,
          status: 404,
          message: 'ReQuest Not Found',
        };
      }

      return {
        success: true,
        status: 200,
        message: 'You Deleted Request  Successfully',
        data: request,
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Is Say : ${error}`,
      );
    }
  }
}
