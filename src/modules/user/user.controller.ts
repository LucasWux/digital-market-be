import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dto/response-user.dto';
import { UserId } from 'src/decorators/user-payload.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch()
  @ApiOkResponse({ type: [UserResponseDto] })
  async updateUserInfo(@UserId() userId: number, @Body() dto: UpdateUserDto) {
    return await this.userService.update(userId, dto);
  }

  @Get('/:id')
  @ApiOkResponse({ type: [UserResponseDto] })
  async getById(@Param('id') id: number) {
    return await this.userService.findById(id);
  }
}
