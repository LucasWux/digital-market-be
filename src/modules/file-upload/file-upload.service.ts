import { Injectable } from '@nestjs/common';
import { BufferedFile } from '../minio-client/file.model';
import { MinioClientService } from '../minio-client/minio-client.service';

@Injectable()
export class FileUploadService {
  constructor(private minioClientService: MinioClientService) {}

  async uploadSingle(image: BufferedFile) {
    const uploaded_image = await this.minioClientService.upload(image);

    return {
      fileName: uploaded_image.filename,
      message: 'Successfully uploaded to MinIO S3',
      code: 200,
    };
  }

  async get(fileName: string) {
    const stat = await this.minioClientService.statObject(fileName);
    let contentType = '';
    if (stat && stat.metaData && stat.metaData['content-type']) {
      contentType = stat.metaData['content-type'];
    } else {
      contentType = 'application/octet-stream'; // Default to generic binary type if not found
    }
    const file = await this.minioClientService.get(fileName);
    return {
      file,
      contentType,
    };
  }
}
