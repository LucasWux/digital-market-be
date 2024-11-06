import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  avatar?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, required: false })
  birthDay?: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ type: Boolean, required: false })
  gender?: boolean; // 0 stand for female, 1 stand for male

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  address?: string;
}
