import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsArray,
  Min,
  Max,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { ProductType } from '../entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  description: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ type: [String] })
  @IsString({ each: true })
  images: string[];

  @IsNumber()
  @IsNotEmpty()
  @Min(0.01, { message: 'Price must be greater than 0' })
  @ApiProperty({ type: Number, default: 1 })
  price: number;

  @IsNumber()
  @Min(0, { message: 'Discount must be at least 0' })
  @Max(100, { message: 'Discount cannot be greater than 100' })
  @IsOptional()
  @ApiProperty({ type: Number, default: 0 })
  discount: number;

  @IsNumber()
  @Min(1, { message: 'Remaining must be greater than 0' })
  @IsNotEmpty()
  @ApiProperty({ type: Number, default: 1 })
  remaining: number;

  @IsNumber()
  @Min(0, { message: 'Sold Number must be greater than or equal 0' })
  @IsNotEmpty()
  @ApiProperty({ type: Number, default: 0 })
  soldNumber: number;

  @IsNumber()
  @Min(0, { message: 'Rating must be greater than or equal 0' })
  @IsNotEmpty()
  @ApiProperty({ type: Number, default: 0 })
  rating: number;

  @IsOptional()
  @IsArray()
  @IsEnum(ProductType, { each: true, message: 'Invalid product type' })
  @ApiProperty({
    isArray: true,
    enum: ProductType,
    required: false,
    type: [ProductType],
  })
  types?: ProductType[];
}
