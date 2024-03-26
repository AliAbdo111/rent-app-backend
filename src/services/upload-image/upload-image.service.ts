import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
@Injectable()
export class UploadImageService {
  private s3: S3Client;
  constructor(private configrService: ConfigService) {
    const awsConfig = this.configrService.get('aws');
    this.s3 = new S3Client(awsConfig);
  }

  async upload(stream: Readable, fileName: string, bucketName: string) {
    try {
      const uploadParam = {
        Bucket: bucketName,
        Key: fileName,
        Body: stream,
      };
      const param = new PutObjectCommand(uploadParam);
      const result = await this.s3.send(param);
      console.log(result)
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Upload file :${error}`,
      );
    }
  }
}
