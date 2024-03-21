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
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { RequestRentingService } from './request-renting.service';
import { CreateRequestRentingDto } from './dto/create-request-renting.dto';
import { UpdateRequestRentingDto } from './dto/update-request-renting.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/clodinary.service';
import { AuthGuard } from 'src/auth/AuthGuard';
import { Request, Response } from 'express';
import { Status } from 'src/Types/Inspection';
import { join } from 'path';
import { createReadStream } from 'fs';
import { readContract } from 'src/utils/readFile';

@Controller('rent-request')
export class RequestRentingController {
  folderName: string = 'rent-request';
  constructor(
    private cloudinaryService: CloudinaryService,
    private readonly requestRentingService: RequestRentingService,
  ) {}
  @UseGuards(AuthGuard)
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

      const frontIdImage = await this.cloudinaryService.uploadImage(
        files.frontIdImage[0],
        this.folderName,
      );
      const rearIdImage = await this.cloudinaryService.uploadImage(
        files.rearIdImage[0],
        this.folderName,
      );
      const request = await this.requestRentingService.create({
        ...createRequestRentingDto,
        rearIdImage: rearIdImage.secure_url,
        frontIdImage: frontIdImage.secure_url,
      });
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
        message: 'The rental request has been created successfully',
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Request Renting Is :${error}`,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() query: any) {
    try {
      const page = query.page || 1;
      const limit = query.page || 10;
      const { pagesCount, requestes } =
        await this.requestRentingService.findAll(limit, page);
      return {
        success: true,
        status: 200,
        message: 'You Get All Rental Requestes Succefully',
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

  @UseGuards(AuthGuard)
  @Get('byId/:id')
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
        message: 'You Get Request By Id Successfully',
        data: request,
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Requestes renting :${error}`,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get('/byUser')
  async findOneByUser(@Req() req: Request) {
    try {
      const { sub } = (req as any).decodedData;
      console.log(sub);
      const request = await this.requestRentingService.findByUser(sub);

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
        message: 'You Get Request By User Successfully',
        data: request,
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Requestes renting :${error}`,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get('/byUnit/:id')
  async findOneByUnit(@Param('id') id: string) {
    try {
      const request = await this.requestRentingService.findByUnit(id);

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
        message: 'You Get Request By Unit Successfully',
        data: request,
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Requestes renting :${error}`,
      );
    }
  }

  @UseGuards(AuthGuard)
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
      throw new ServiceUnavailableException(`Error From Service Is : ${error}`);
    }
  }

  @UseGuards(AuthGuard)
  @Patch('updateRequestStatus/:id')
  async updateRequestStatus(
    @Res() res: Response,
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    try {
      const request = await this.requestRentingService.updateRequestStatus(
        id,
        status,
      );
      if (!request) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: 'Not Found Request With This Id ',
        });
      }
      if (status === 'ACCEPTE') {
        await readContract()
        const fileName = 'contract.docx';
        const file = createReadStream(join(process.cwd(), 'contract.docx'));
         return file.pipe(res);
      }
      res.status(200).json({
        success: true,
        status: 200,
        message: 'Request Updated Succesfuly With This Id ',
      });
    } catch (error) {
      throw new ServiceUnavailableException(`Error From Service Is : ${error}`);
    }
  }

  @UseGuards(AuthGuard)
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
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Is Say : ${error}`,
      );
    }
  }
}
