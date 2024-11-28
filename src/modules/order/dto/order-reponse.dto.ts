import { ApiResponseProperty } from '@nestjs/swagger';
import { OrderStatus } from '../entities/order.entity';

export class OrderResponse {
  @ApiResponseProperty({ enum: OrderStatus })
  status: OrderStatus;

  @ApiResponseProperty({ type: Number })
  ownerId: number;

  @ApiResponseProperty({ type: Number })
  productId: number;

  @ApiResponseProperty({ type: String })
  address: string;

  @ApiResponseProperty({ type: Number })
  amount: number;

  @ApiResponseProperty({ type: Number })
  createdTime: number;

  @ApiResponseProperty({ type: Number })
  purchasedTime: number;
}
