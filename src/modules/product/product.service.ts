import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}
  async create(ownerId: number, createProductDto: CreateProductDto) {
    return await this.repo.save({ ownerId, ...createProductDto });
  }

  async findByOwnerId(ownerId: number) {
    return await this.repo.findBy({ ownerId });
  }
}
