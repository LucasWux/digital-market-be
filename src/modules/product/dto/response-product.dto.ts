import { ApiResponseProperty } from '@nestjs/swagger';
import {
  BasePaginationResponse,
  BaseResponse,
} from 'src/utils/base/base-response';
import { ProductStatus, ProductType } from '../entities/product.entity';

export class ProductResponseDto extends BaseResponse {
  @ApiResponseProperty({ enum: ProductStatus })
  status: ProductStatus;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String })
  description?: string;

  @ApiResponseProperty({ type: [String] })
  images: string[];

  @ApiResponseProperty({ type: Number })
  price: number;

  @ApiResponseProperty({ type: Number })
  discount: number;

  @ApiResponseProperty({ type: Number })
  rating: number;

  @ApiResponseProperty({ type: Number })
  remaining: number;

  @ApiResponseProperty({ type: Number })
  soldNumber: number;

  @ApiResponseProperty({ type: Number })
  totalLike: number;

  @ApiResponseProperty({ type: Number })
  totalReview: number;

  @ApiResponseProperty({ type: Number })
  ownerId: number;

  @ApiResponseProperty({ type: [String], enum: ProductType })
  types?: ProductType[];

  @ApiResponseProperty({ type: Number })
  createdTime: number;
}
export class ProductPaginationResponse extends BasePaginationResponse {
  @ApiResponseProperty({ type: [ProductResponseDto] })
  data: ProductResponseDto[];
}
