import { ApiResponseProperty } from '@nestjs/swagger';

export class BaseResponse {
  @ApiResponseProperty({ type: String })
  id: number;

  @ApiResponseProperty({ type: String })
  created_at: Date;

  @ApiResponseProperty({ type: String })
  updated_at: Date;
}
