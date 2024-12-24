import { ApiResponseProperty } from '@nestjs/swagger';

export class UploadFileResponse {
  @ApiResponseProperty({ type: String })
  fileName: string;

  @ApiResponseProperty({ type: String })
  message: string;

  @ApiResponseProperty({ type: Number })
  code: number;
}
