import { ApiResponseProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/utils/base/base-response';
import { ChatStatus } from '../entities/chat.entity';

export class ChatResponseDto extends BaseResponse {
  @ApiResponseProperty({ enum: ChatStatus })
  status: ChatStatus;

  @ApiResponseProperty({ type: Number })
  senderId: number;

  @ApiResponseProperty({ type: Number })
  receiverId: number;

  @ApiResponseProperty({ type: String })
  content: string;

  @ApiResponseProperty({ type: [String] })
  image: string[];

  @ApiResponseProperty({ type: Number })
  createTime: number;
}
