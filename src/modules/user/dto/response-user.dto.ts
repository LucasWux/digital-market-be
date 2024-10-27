import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ type: String })
  id: number;

  @ApiProperty({ type: String })
  userName: string;

  @ApiProperty({ type: String })
  created_at: Date;

  @ApiProperty({ type: String })
  updated_at: Date;
}
