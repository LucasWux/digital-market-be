import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  ratingPoint: number;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  comment: string;
}
