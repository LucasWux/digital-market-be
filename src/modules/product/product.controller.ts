import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UserId } from 'src/decorators/user-payload.decorator';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProductResponseDto } from './dto/response-product.dto';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOkResponse({ type: ProductResponseDto })
  async create(
    @UserId() userId: number,
    @Body() createProductDto: CreateProductDto,
  ) {
    return await this.productService.create(userId, createProductDto);
  }

  @Get('/:ownerId')
  @ApiOkResponse({ type: [ProductResponseDto] })
  async findByOwnerId(@Param('ownerId') ownerId: number) {
    return await this.productService.findByOwnerId(ownerId);
  }
}
