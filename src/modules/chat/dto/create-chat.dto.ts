import { Chat } from '../entities/chat.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
    @ApiProperty({ type: Number})
    status ?: boolean;

}
