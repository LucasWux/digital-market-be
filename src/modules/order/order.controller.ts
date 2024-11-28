import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponse } from './dto/order-reponse.dto';
import { UserId } from 'src/decorators/user-payload.decorator';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Post()
  @ApiOkResponse({ type: OrderResponse })
  @ApiOperation({ summary: 'Create New Order' })
  async createNewOrder(@UserId() userId: number, @Body() dto: CreateOrderDto) {
    return await this.service.create(userId, dto);
  }

  @Get()
  @ApiOkResponse({ type: [OrderResponse] })
  @ApiOperation({ summary: 'Find In Cart Order by ownerId' })
  async findInCartByOwnerId(@UserId() userId: number) {
    return await this.service.findInCartByOwnerId(userId);
  }
}
