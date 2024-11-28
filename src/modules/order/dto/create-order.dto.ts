import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  @ApiProperty({ enum: OrderStatus })
  status: OrderStatus;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  productId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  address: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  amount: number;
}
