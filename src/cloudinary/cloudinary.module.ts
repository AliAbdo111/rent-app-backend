import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary';

@Module({
  providers: [CloudinaryProvider],
})
export class CloudinaryModule {}
