import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class QueryChatDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  userId: number;
}
