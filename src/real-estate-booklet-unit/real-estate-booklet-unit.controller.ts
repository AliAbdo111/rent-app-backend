import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ServiceUnavailableException,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { RealEstateBookletUnitService } from './real-estate-booklet-unit.service';
import { CreateRealEstateBookletUnitDto } from './dto/create-real-estate-booklet-unit.dto';
import { UpdateRealEstateBookletUnitDto } from './dto/update-real-estate-booklet-unit.dto';
import { CloudinaryService } from 'src/cloudinary/clodinary.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('real-estate-booklet-unit')
export class RealEstateBookletUnitController {
  folderName: string = 'realEstateUnite';
  constructor(
    private readonly realEstateBookletUnitService: RealEstateBookletUnitService,
    private readonly cloudnirayService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Body() createRealEstateUnitDto: CreateRealEstateBookletUnitDto,
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

      await this.realEstateBookletUnitService.create({
        ...createRealEstateUnitDto,
        images: urles,
      });
      return {
        success: true,
        status: 201,
        message: 'Real Estate Unit Created Successfuly',
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error from realEstate Booklet Unit Service Is :${error}`,
      );
    }
  }

  @Get()
  async findAll(@Query() query: any) {
    try {
      const limit = parseInt(query.limit) || 10;
      const page = parseInt(query.page) || 1;
      const realEstat = await this.realEstateBookletUnitService.findAll(
        limit,
        page,
      );
      return {
        success: true,
        status: 200,
        limit: limit,
        page: page,
        message: 'You Get Real Estate Units Successfuly',
        realEstatUnit: realEstat,
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error from realEstate Booklet Unit Service Is :${error}`,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const realEstat = await this.realEstateBookletUnitService.findOne(id);
      if (!realEstat) {
        return {
          success: false,
          status: 400,
          message: 'Not Found Real Estate Unit',
        };
      }
      return {
        success: true,
        status: 200,
        message: 'You Get Real Estate Unit Successfuly',
        realEstatUnit: realEstat,
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error from realEstate Booklet Unit Service Is :${error}`,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRealEstateUnitDto: UpdateRealEstateBookletUnitDto,
  ) {
    try {
      const realEstat = await this.realEstateBookletUnitService.update(
        id,
        updateRealEstateUnitDto,
      );
      if (!realEstat) {
        return {
          success: false,
          status: 400,
          message: 'Not Found Real Estate Unit',
        };
      }
      return {
        success: true,
        status: 200,
        message: 'Real Estate Unit Update Successfuly',
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error from realEstate Booklet Unit Service Is :${error}`,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const unit = await this.realEstateBookletUnitService.remove(id);
      if (!unit) {
        return {
          success: false,
          status: 400,
          message: 'Not Found Real Estate Unit',
        };
      }
      return {
        success: true,
        status: 200,
        message: 'You Delete Real Estate Unit Successfuly',
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error from realEstate Booklet Unit Service Is :${error}`,
      );
    }
  }

  @Get('units/getLastUnitBookelt')
  async getLastUnitRealEstat() {
    try {
      const units = await this.realEstateBookletUnitService.getLastUnit();
      return {
        success: true,
        status: 200,
        message: 'You Get Last Unit Bookelt Unit Successfuly',
        realEstatUnit: units,
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error from realEstate Booklet Unit Service Is :${error}`,
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
