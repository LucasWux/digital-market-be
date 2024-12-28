import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';

export class UpdateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({ type: Number })
  id: number;

  @IsEnum(OrderStatus)
  @IsNotEmpty()
  @ApiProperty({ enum: OrderStatus })
  status: OrderStatus;
}
