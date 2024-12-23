import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Brackets, In, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getTimeNowBySeconds } from 'src/utils/timeHelpers';
import { QueryPaginationProduct } from './dto/query-product.dto';
import { ProductPaginationResponse } from './dto/response-product.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { RedisKey } from 'src/utils/RedisKey';
import { getRandomNumbersCustom } from 'src/utils/helpers';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
    @InjectRedis()
    private readonly redis: Redis,
  ) {}
  async create(ownerId: number, createProductDto: CreateProductDto) {
    return await this.repo.save({
      ownerId,
      ...createProductDto,
      createdTime: getTimeNowBySeconds(),
    });
  }

  async findDetail(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async findByOwner(ownerId: number) {
    return await this.repo.findBy({ ownerId });
  }

  async findPagination(dto: QueryPaginationProduct, userId: number | null) {
    const { page, pageSize, search, types, sortBy, sortOrder } = dto;
    const offset = (page - 1) * pageSize;

    const qb = this.repo.createQueryBuilder('item').skip(offset).take(pageSize);
    if (types)
      for (const type of types) {
        qb.andWhere('item.types LIKE :type', { type: `%${type}%` });
      }

    if (search) {
      qb.andWhere(
        new Brackets((qb) => {
          qb.where('item.name LIKE :search', { search: `%${search}%` }).orWhere(
            'item.description LIKE :search',
            {
              search: `%${search}%`,
            },
          );
        }),
      );
    }

    if (sortBy) {
      qb.orderBy(`item.${sortBy}`, sortOrder);
    }

    const [data, total] = await qb.getManyAndCount();

    if (search && userId) {
      const productIds = data.map((item) => item.id);
      await this.redis.set(
        `${RedisKey.recentSearch}:${userId}`,
        JSON.stringify(productIds),
      );
    }

    return {
      data,
      total,
      page,
      pageSize,
    } as ProductPaginationResponse;
  }

  async findAndSortBySoldNumber(limit: number = 20) {
    const products = await this.repo.find({
      order: {
        soldNumber: 'DESC',
      },
      take: Number(limit),
    });

    return products;
  }

  async findNewest(limit: number = 20) {
    return await this.repo.find({
      order: {
        createdTime: 'DESC',
      },
      take: Number(limit),
    });
  }

  async findRecentSearch(userId: number | null) {
    if (!userId) return null;
    const rawIds = await this.redis.get(`${RedisKey.recentSearch}:${userId}`);
    if (!rawIds) return null;
    const productIds = JSON.parse(rawIds) as number[];
    return await this.repo.findBy({ id: In(productIds) });
  }

  async findByRating(limit: number = 20) {
    return await this.repo.find({
      order: {
        rating: 'DESC',
      },
      take: Number(limit),
    });
  }

  async findDiscovery(limit: number = 20) {
    const ids = getRandomNumbersCustom(limit, 100);
    return await this.repo.findBy({ id: In(ids) });
  }

  async deleteByProductId(productId: number) {
    await this.repo.delete(productId);
  }

  async deleteAll() {
    await this.repo.clear();
  }
}
