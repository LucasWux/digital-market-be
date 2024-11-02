import { ApiResponseProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiResponseProperty({ type: String })
  message: string;

  @ApiResponseProperty({ type: Boolean })
  isSuccess: boolean;
}
