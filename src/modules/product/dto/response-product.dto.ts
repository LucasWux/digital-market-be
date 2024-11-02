import { ApiResponseProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/utils/base/base-response';
import { ProductStatus, ProductType } from '../entities/product.entity';

export class ProductResponse extends BaseResponse {
  @ApiResponseProperty({ enum: ProductStatus })
  status: ProductStatus;

  @ApiResponseProperty({ type: Number })
  Price: number;

  @ApiResponseProperty({ type: Number })
  discount: number;

  @ApiResponseProperty({ type: Number })
  rating: number;

  @ApiResponseProperty({ type: Number })
  remaining: number;

  @ApiResponseProperty({ type: Number })
  totalLike: number;

  @ApiResponseProperty({ type: Number })
  totalReview: number;

  @ApiResponseProperty({ type: Number })
  ownerId: number;

  @ApiResponseProperty({ type: String, enum: ProductType })
  type?: ProductType[];
}
