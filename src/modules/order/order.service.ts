import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getTimeNowBySeconds } from 'src/utils/timeHelpers';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly repo: Repository<Order>,
  ) {}

  async create(ownerId: number, dto: CreateOrderDto) {
    return await this.repo.save({
      ownerId,
      ...dto,
      createdTime: getTimeNowBySeconds(),
    });
  }

  async findInCartByOwnerId(ownerId: number) {
    return await this.repo.find({
      where: { ownerId },
      order: { createdTime: 'DESC' },
    });
  }
}
