import { ApiProperty } from '@dataui/crud/lib/crud';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/utils/base/pagination.dto';
import { ProductType } from '../entities/product.entity';

export enum SortBy {
  createdTime = 'createdTime',
  price = 'price',
  rating = 'rating',
  remaining = 'remaining',
  soldNumber = 'soldNumber',
}

export enum SortOrder {
  DESC = 'DESC',
  ASC = 'ASC',
}

export class QueryPaginationProduct extends PaginationDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  search: string;

  @IsOptional()
  @IsEnum(ProductType, { each: true, message: 'Invalid product type' })
  @ApiProperty({
    isArray: true,
    enum: ProductType,
    required: false,
    type: [ProductType],
  })
  types?: ProductType[];

  @IsEnum(SortBy)
  @IsOptional()
  @ApiProperty({
    enum: SortBy,
    required: false,
    default: SortBy.createdTime,
  })
  sortBy?: SortBy;

  @IsEnum(SortOrder)
  @IsOptional()
  @ApiProperty({
    enum: SortOrder,
    required: false,
    default: SortOrder.DESC,
  })
  sortOrder?: SortOrder;
}
