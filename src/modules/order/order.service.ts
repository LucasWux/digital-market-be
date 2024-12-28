import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getTimeNowBySeconds } from 'src/utils/timeHelpers';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { QueryPaginationOrder } from './dto/query-order.dto';
import { OrderPaginationResponse } from './dto/order-reponse.dto';

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

  async updateStatus(dto: UpdateOrderDto) {
    await this.repo.update({ id: dto.id }, { status: dto.status });
    return await this.repo.findOneBy({ id: dto.id });
  }

  async findPagination(dto: QueryPaginationOrder) {
    const { page, pageSize, status } = dto;
    const offset = (page - 1) * pageSize;

    const qb = this.repo.createQueryBuilder('item').skip(offset).take(pageSize);

    if (status) {
      qb.andWhere('item.status = :status', { status });
    }

    qb.orderBy(`item.createdTime`, 'DESC');

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      total,
      page,
      pageSize,
    } as OrderPaginationResponse;
  }

  async findOne(id: number) {
    return await this.repo.findOneBy({ id });
  }
}
