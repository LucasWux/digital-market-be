import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/utils/base/pagination.dto';
import { OrderStatus } from '../entities/order.entity';
import { ApiProperty } from '@nestjs/swagger';

export class QueryPaginationOrder extends PaginationDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  @ApiProperty({
    enum: OrderStatus,
    required: false,
  })
  status?: OrderStatus;
}
