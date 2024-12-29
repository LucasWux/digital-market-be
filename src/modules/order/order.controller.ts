import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  OrderPaginationResponse,
  OrderResponse,
} from './dto/order-reponse.dto';
import { UserId } from 'src/decorators/user-payload.decorator';
import { Public } from 'src/decorators/public.decorator';
import { UpdateOrderDto } from './dto/update-order.dto';
import { QueryPaginationOrder } from './dto/query-order.dto';

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

  @Patch()
  @Public()
  @ApiOkResponse({ type: OrderResponse })
  @ApiOperation({ summary: 'Update Status Order' })
  async updateStatus(@Query() dto: UpdateOrderDto) {
    return await this.service.updateStatus(dto);
  }

  @Get()
  @Public()
  @ApiOkResponse({ type: OrderPaginationResponse })
  @ApiOperation({ summary: 'Query Order' })
  async findPagination(@Query() dto: QueryPaginationOrder) {
    return await this.service.findPagination(dto);
  }

  @Get('/:id')
  @Public()
  @ApiOkResponse({ type: OrderResponse })
  @ApiOperation({ summary: 'Order Detail' })
  async findOne(@Param('id') id: string) {
    return await this.service.findOne(Number(id));
  }

  @Delete('/all')
  @Public()
  async deleteAll() {
    await this.service.deleteAll();
  }

  @Delete('/one')
  @Public()
  async deleteOne(@Query('orderId') orderId: number) {
    await this.service.deleteByOrderId(Number(orderId));
  }
}
