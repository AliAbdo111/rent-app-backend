import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { Readable } from 'stream';

export interface SourceImage{
  secure_url: string,
  fileName: string
}
@Injectable()
export class UploadImageService {
  private s3: S3Client;
  constructor(private configrService: ConfigService) {
    const awsConfig = this.configrService.get('aws');
    this.s3 = new S3Client(awsConfig);
  }

  async upload(
    stream: Readable,
    fileName: string,
    bucketName: string,
    ContentType: string,
  ): Promise<SourceImage> {
    try {
      const uploadParam = {
        Bucket: bucketName,
        Key: fileName,
        Body: stream,
        // ACL: 'public-read' as const,
        ContentType: ContentType,
        ContentDisposition: 'inline',

      };
      const param = new PutObjectCommand(uploadParam);
      await this.s3.send(param);
      const url = `https://${bucketName}.s3.${process.env.AWS_SNS_REGION}.amazonaws.com/${fileName}`;
      console.log('URL of the uploaded file:', url);
      return { 
        secure_url: url,
        fileName: fileName,
      }
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Upload file :${error}`,
      );
    }
  }

  async deleteImage(bucketName: string, fileName: string) {
    try {
        const deleteParams ={
            Bucket: bucketName,
            Key: fileName,
        }
      const param = new DeleteObjectCommand(deleteParams);
        
        const result =await this.s3.send(param)
        console.log(result)
    } catch (error) {
        throw new ServiceUnavailableException(
            `Error From Service Upload file :${error}`,
          );
    }
  }

  async update(stream: Readable, fileName: string, bucketName: string) {
    const uploadParams: PutObjectCommandInput = {
      Bucket: bucketName,
      Key: fileName,
      Body: stream,
      ACL: 'public-read' as const, // Ensure ACL is of type ObjectCannedACL
    };

    try {
      const command = new PutObjectCommand(uploadParams);
      const result = await this.s3.send(command);
      console.log('File updated in S3:', fileName);
      return true;
    } catch (error) {
      console.error('Error updating file in S3:', error);
      throw error;
    }
  }
}
