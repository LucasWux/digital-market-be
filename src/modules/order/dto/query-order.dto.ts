import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/utils/base/pagination.dto';
import { OrderStatus } from '../entities/order.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class QueryPaginationOrder extends PaginationDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  @ApiProperty({
    enum: OrderStatus,
    required: false,
  })
  status?: OrderStatus;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    type: Number,
    required: false,
  })
  buyer?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    type: Number,
    required: false,
  })
  seller?: number;
}
