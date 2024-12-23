import { ApiResponseProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/utils/base/base-response';

export class RatingResponse extends BaseResponse {
  @ApiResponseProperty({ type: Number })
  userId: number;

  @ApiResponseProperty({ type: Number })
  productId: number;

  @ApiResponseProperty({ type: Number })
  ratingPoint: number;

  @ApiResponseProperty({ type: String })
  comment: string;
}
