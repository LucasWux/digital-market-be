import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Brackets, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getTimeNowBySeconds } from 'src/utils/timeHelpers';
import { QueryPaginationProduct } from './dto/query-product.dto';
import { ProductPaginationResponse } from './dto/response-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
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

  async findPagination(dto: QueryPaginationProduct) {
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
}
