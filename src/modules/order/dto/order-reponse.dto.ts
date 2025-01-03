import { ApiResponseProperty } from '@nestjs/swagger';
import { OrderStatus } from '../entities/order.entity';
import {
  BasePaginationResponse,
  BaseResponse,
} from 'src/utils/base/base-response';

export class OrderResponse extends BaseResponse {
  @ApiResponseProperty({ enum: OrderStatus })
  status: OrderStatus;

  @ApiResponseProperty({ type: Number })
  ownerId: number;

  @ApiResponseProperty({ type: Number })
  productId: number;

  @ApiResponseProperty({ type: Number })
  sellerId: number;

  @ApiResponseProperty({ type: String })
  address: string;

  @ApiResponseProperty({ type: Number })
  amount: number;

  @ApiResponseProperty({ type: Number })
  createdTime: number;

  @ApiResponseProperty({ type: Number })
  purchasedTime: number;
}

export class OrderPaginationResponse extends BasePaginationResponse {
  @ApiResponseProperty({ type: [OrderResponse] })
  data: OrderResponse[];
}
