import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { MinioClient, MinioService } from 'nestjs-minio-client';
import { BufferedFile } from './file.model';
import * as crypto from 'crypto';
import { env } from 'src/config';
import { BucketItemStat } from 'minio';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const allowedMimeTypes = ['image/jpeg', 'image/png'];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const checkValidMineType = (mimeType: string) => {
  // if (!allowedMimeTypes.includes(mimeType)) {
  //   throw new HttpException(
  //     { code: ExceptionCodes.INVALID_FILE, message: 'Invalid file' },
  //     HttpStatus.BAD_REQUEST
  //   );
  // }
};

@Injectable()
export class MinioClientService {
  private readonly logger: Logger;
  private readonly baseBucket = env.minio.bucket;

  async onModuleInit() {
    await this.createBucket(this.baseBucket);
  }

  public get client(): MinioClient {
    return this.minio.client;
  }

  constructor(private readonly minio: MinioService) {
    this.logger = new Logger('MinioStorageService');
  }

  public async upload(
    file: BufferedFile,
    baseBucket: string = this.baseBucket,
  ) {
    checkValidMineType(file.mimetype);

    const temp_filename = Date.now().toString();
    const hashedFileName = crypto
      .createHash('md5')
      .update(temp_filename)
      .digest('hex');
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
    const metaData = {
      'Content-Type': file.mimetype,
      'X-Amz-Meta-Testing': 1234,
    };
    const filename = hashedFileName + ext;
    const fileName: string = `${filename}`;
    const fileBuffer = file.buffer;
    try {
      await this.client.putObject(
        baseBucket,
        fileName,
        fileBuffer,
        file.size,
        metaData,
      );
    } catch (error) {
      this.logger.error(`ErrorUploadFile ${error}`);
      throw new HttpException(
        { code: 'INVALID_FILE', message: 'Invalid file' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      filename,
    };
  }

  public async get(fileName: string, baseBucket: string = this.baseBucket) {
    const file = await this.client.getObject(baseBucket, fileName);
    return file;
  }

  public async statObject(
    fileName: string,
    baseBucket: string = this.baseBucket,
  ): Promise<BucketItemStat> {
    const stat = await this.client.statObject(baseBucket, fileName);
    return stat;
  }

  async delete(objetName: string, baseBucket: string = this.baseBucket) {
    await this.client.removeObject(baseBucket, objetName);
  }

  async createBucket(bucketName: string) {
    if (this.client.bucketExists(bucketName)) {
      this.logger.log(`Bucket ${bucketName} already exists`);
      return;
    }
    await this.client.makeBucket(bucketName);
  }
}
