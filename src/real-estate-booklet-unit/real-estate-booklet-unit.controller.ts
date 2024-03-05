import { Controller, Get, Post, Body, Patch, Param, Delete, ServiceUnavailableException, UseInterceptors, UploadedFiles } from '@nestjs/common';
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
  ) { }

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Body() createRealEstateUnitDto: CreateRealEstateBookletUnitDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    try{
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
  
      return this.realEstateBookletUnitService.create({
        ...createRealEstateUnitDto,
        images: urles,
      });
    }catch (error){
      throw new ServiceUnavailableException(
        `Error from realEstate Booklet Unit Service Is :${error}`,
      );
    }
  }

  @Get()
  findAll() {
    try {
      return this.realEstateBookletUnitService.findAll();
      } catch (error) {
      throw new ServiceUnavailableException(
        `Error from realEstate Booklet Unit Service Is :${error}`,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.realEstateBookletUnitService.findOne(id);
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
      return await this.realEstateBookletUnitService.update(
        id,
        updateRealEstateUnitDto,
      );
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error from realEstate Booklet Unit Service Is :${error}`,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.realEstateBookletUnitService.remove(id);
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error from realEstate Booklet Unit Service Is :${error}`,
      );
    }
  }

  @Get('units/getLastUnitRealEstat')
  async getLastUnitRealEstat() {
    try {
      return await this.realEstateBookletUnitService.getLastUnit();
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
