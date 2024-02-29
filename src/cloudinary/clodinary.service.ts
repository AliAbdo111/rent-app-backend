//#region
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(
    file: Express.Multer.File,
    folderName: string,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream({
          folder: folderName,
        },
        (error, result) => {
        if (error) return reject(error);
          resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }

  async deleteImage(assetId: any, folderName: string) {
    try {
      const publicId = folderName ? `${folderName}/${assetId}` : assetId;
      const destroy = await v2.uploader.destroy(assetId);
      return destroy;
    } catch (error) {
      throw new Error(`Error deleting image from Cloudinary${error}`)
    }
  }
}
//#endregion
