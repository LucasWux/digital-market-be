import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsArray,
  Min,
  Max,
} from 'class-validator';
import { ProductType } from '../entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsNumber()
  @Min(0.01, { message: 'Price must be greater than 0' })
  @ApiProperty({ type: Number })
  price: number;

  @IsNumber()
  @Min(0, { message: 'Discount must be at least 0' })
  @Max(100, { message: 'Discount cannot be greater than 100' })
  @ApiProperty({ type: Number })
  discount: number;

  @IsNumber()
  @Min(1, { message: 'Remaining must be greater than 0' })
  @ApiProperty({ type: Number })
  remaining: number;

  @IsOptional()
  @IsArray()
  @IsEnum(ProductType, { each: true, message: 'Invalid product type' })
  @ApiProperty({
    isArray: true,
    enum: ProductType,
    required: false,
    type: [ProductType],
  })
  type?: ProductType[];
}
