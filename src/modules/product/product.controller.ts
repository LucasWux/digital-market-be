import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UserId } from 'src/decorators/user-payload.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @UserId() userId: number,
    @Body() createProductDto: CreateProductDto,
  ) {
    return await this.productService.create(userId, createProductDto);
  }

  @Get('/:ownerId')
  async findByOwnerId(@Param('ownerId') ownerId: number) {
    return await this.productService.findByOwnerId(ownerId);
  }
}
