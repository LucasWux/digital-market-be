import { Module } from '@nestjs/common';
import { MinioClientService } from './minio-client.service';
import { MinioModule } from 'nestjs-minio-client';
import { env } from 'src/config';
@Module({
  imports: [
    MinioModule.register({
      endPoint: env.minio.host,
      port: env.minio.port,
      useSSL: false,
      accessKey: env.minio.accessKey,
      secretKey: env.minio.secretKey,
    }),
  ],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule {}
