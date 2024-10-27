import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { UserResponseDto } from './dto/response-user.dto';
import { UserId } from 'src/decorators/user-payload.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ type: [UserResponseDto] })
  async getAllUser(@UserId() userId: number) {
    console.log(userId);
    return await this.userService.getAll();
  }
}
