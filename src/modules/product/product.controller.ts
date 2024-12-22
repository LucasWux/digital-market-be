import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UserId } from 'src/decorators/user-payload.decorator';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ProductPaginationResponse,
  ProductResponseDto,
} from './dto/response-product.dto';
import { Public } from 'src/decorators/public.decorator';
import { QueryPaginationProduct } from './dto/query-product.dto';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOkResponse({ type: ProductResponseDto })
  @ApiOperation({ summary: 'Create New Product' })
  async create(
    @UserId() userId: number,
    @Body() createProductDto: CreateProductDto,
  ) {
    return await this.productService.create(userId, createProductDto);
  }

  @Get()
  @Public()
  @ApiOkResponse({ type: ProductPaginationResponse })
  @ApiOperation({ summary: 'Query Product' })
  async findPagination(@Query() dto: QueryPaginationProduct) {
    return await this.productService.findPagination(dto);
  }

  @Get('/seller/:ownerId')
  @Public()
  @ApiOperation({ summary: 'Get Products by ownerId' })
  @ApiOkResponse({ type: [ProductResponseDto] })
  async findByOwnerId(@Param('ownerId') ownerId: number) {
    return await this.productService.findByOwner(ownerId);
  }

  @Get('/best-sale')
  @Public()
  @ApiOperation({ summary: 'Get Best Sale Products' })
  @ApiOkResponse({ type: [ProductResponseDto] })
  async findBestSale() {
    return await this.productService.findAndSortBySoldNumber();
  }

  @Get('/newest')
  @Public()
  @ApiOperation({ summary: 'Get Newest Products' })
  @ApiOkResponse({ type: [ProductResponseDto] })
  async findNewest() {
    return await this.productService.findNewest();
  }

  @Get('/:productId')
  @Public()
  @ApiOperation({ summary: 'Get Product Detail by productId' })
  @ApiOkResponse({ type: ProductResponseDto })
  async findByProductId(@Param('productId') productId: number) {
    return await this.productService.findDetail(productId);
  }
}
