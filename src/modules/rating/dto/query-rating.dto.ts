import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class QueryRatingDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  productId: number;
}
