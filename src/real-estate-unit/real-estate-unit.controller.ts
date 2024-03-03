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
import { RealEstateUnitService } from './real-estate-unit.service';
import { CreateRealEstateUnitDto } from './dto/create-real-estate-unit.dto';
import { UpdateRealEstateUnitDto } from './dto/update-real-estate-unit.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/clodinary.service';

@Controller('real-estate-unit')
export class RealEstateUnitController {
  folderName: string = 'realEstateUnite';
  constructor(
    private readonly realEstateUnitService: RealEstateUnitService,
    private readonly cloudnirayService: CloudinaryService,
  ) { }

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Body() createRealEstateUnitDto: CreateRealEstateUnitDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
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

    return this.realEstateUnitService.create({
      ...createRealEstateUnitDto,
      images: urles,
    });
  }

  @Get()
  findAll() {
    return this.realEstateUnitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.realEstateUnitService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRealEstateUnitDto: UpdateRealEstateUnitDto,
  ) {
    return await this.realEstateUnitService.update(id, updateRealEstateUnitDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.realEstateUnitService.remove(id);
  }

  @Get('units/getLastUnitRealEstat')
  async getLastUnitRealEstat() {
    try {
      await this.realEstateUnitService.
    } catch (error) {
throw new ServiceUnavailableException()
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
