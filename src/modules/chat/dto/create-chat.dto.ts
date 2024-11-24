import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateChatDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  receiverId: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  image?: string[];
}
