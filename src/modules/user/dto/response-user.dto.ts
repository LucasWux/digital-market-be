import { ApiResponseProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/utils/base/base-response';

export class UserResponseDto extends BaseResponse {
  @ApiResponseProperty({ type: String })
  username: string;

  @ApiResponseProperty({ type: String })
  avatar: string;

  @ApiResponseProperty({ type: Number })
  birthDay: number;

  @ApiResponseProperty({ type: Boolean })
  gender: boolean; // 0 stand for female, 1 stand for male

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String })
  address: string;
}
