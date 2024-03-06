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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateRealEstateOriginalUnitDto } from './dto/update-real-estate-original-unit.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/clodinary.service';
import { RealEstateOriginalUnitService } from './real-estate-original-unit.service';
import { CreateRealEstateOriginalUnitDto } from './dto/create-real-estate-original-unit.dto';

@Controller('real-estate-original-unit')
export class RealEstateOriginalUnitController {
  folderName: string = 'realEstateUnite';
  constructor(
    private readonly realEstateOriginaletUnitService: RealEstateOriginalUnitService,
    private readonly cloudnirayService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Body() createRealEstateUnitDto: CreateRealEstateOriginalUnitDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    try {
      const urles: {
        public_id: string;
        secure_url: string;
      }[] = await Promise.all(
        images.map(
          async (img): Promise<{ public_id: string; secure_url: string }> => {
            const { public_id, secure_url } =
              await this.cloudnirayService.uploadImage(img, this.folderName);
            return { public_id, secure_url };
          },
        ),
      );

      await this.realEstateOriginaletUnitService.create({
        ...createRealEstateUnitDto,
        images: urles,
      });
      return {
        success: true,
        status: 201,
        message: 'Real Estate Unit original Created Successfuly',
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error from real-estate-original-unit Unit Service Is :${error}`,
      );
    }
  }

  @Get()
  async findAll(@Query() query: any) {
    try {
      const limit = parseInt(query.limit) || 10;
      const page = parseInt(query.page) || 1;
      const realEstat = await this.realEstateOriginaletUnitService.findAll(
        limit,
        page,
      );
      return {
        success: true,
        status: 200,
        limit: limit,
        page: page,
        message: 'You Get Real Estate Units original Successfuly',
        realEstatUnit: realEstat,
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error from realEstate original Unit Service Is :${error}`,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const realEstat = await this.realEstateOriginaletUnitService.findOne(id);
      if (!realEstat) {
        return {
          success: false,
          status: 400,
          message: 'Not Found Real Estate Unit original',
        };
      }
      return {
        success: true,
        status: 200,
        message: 'You Get Real Estate Unit original Successfuly',
        realEstatUnit: realEstat,
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error from realEstate original Unit Service Is :${error}`,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRealEstateUnitDto: UpdateRealEstateOriginalUnitDto,
  ) {
    try {
      const realEstat = await this.realEstateOriginaletUnitService.update(
        id,
        updateRealEstateUnitDto,
      );
      if (!realEstat) {
        return {
          success: false,
          status: 400,
          message: 'Not Found Real Estate Unit original',
        };
      }
      return {
        success: true,
        status: 200,
        message: 'Real Estate Unit original Update Successfuly',
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error from realEstate original Unit Service Is :${error}`,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const unit = await this.realEstateOriginaletUnitService.remove(id);
      if (!unit) {
        return {
          success: false,
          status: 400,
          message: 'Not Found Real Estate Unit original',
        };
      }
      return {
        success: true,
        status: 200,
        message: 'You Delete Real Estate Unit original Successfuly',
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error from realEstate Booklet Unit original Service Is :${error}`,
      );
    }
  }

  @Get('units/getLastUnitBookelt')
  async getLastUnitRealEstat() {
    try {
      const units = await this.realEstateOriginaletUnitService.getLastUnit();
      return {
        success: true,
        status: 200,
        message: 'You Get Last Unit original Unit Successfuly',
        realEstatUnit: units,
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error from realEstate original Unit Service Is :${error}`,
      );
    }
  }
  // @Delete('deleteImageUnit')
  // async deleteImage(
  //   @Query('realEstateUnitId') realEstateUnitId: string,
  //   @Query('assetIdToDelete') assetIdToDelete: string,
  // ): Promise<any> {
  //   await this.cloudnirayService.deleteImage(
  //     assetIdToDelete,
  //     this.folderName,)
  //   const id = new Types.ObjectId(realEstateUnitId);
  //   const realEstateUnit =
  //     await this.realEstateUnitService.findOne(id);

  //   const indexToDelete = realEstateUnit.images.findIndex(
  //     (image: { asset_id: string }) => image.asset_id === assetIdToDelete,
  //   );

  //   if (indexToDelete !== -1) {
  //     await this.cloudnirayService.deleteImage(
  //       assetIdToDelete,
  //       this.folderName,
  //     );

  //     realEstateUnit.images.splice(indexToDelete, 1);
  //     return await realEstateUnit.save();
  //   } else {
  //     throw new NotFoundException('Image not found');
  //   }
  // }
}
