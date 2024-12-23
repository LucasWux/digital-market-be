import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
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
  async findPagination(
    @Query() dto: QueryPaginationProduct,
    @UserId() userId: number,
  ) {
    return await this.productService.findPagination(dto, userId);
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

  @Get('/recent-search')
  @Public()
  @ApiOperation({ summary: 'Get recent search Products' })
  @ApiOkResponse({ type: [ProductResponseDto] })
  async findRecentSearch(@UserId() userId: number) {
    return await this.productService.findRecentSearch(userId);
  }

  @Get('/discovery')
  @Public()
  @ApiOperation({ summary: 'Get discovery Products' })
  @ApiOkResponse({ type: [ProductResponseDto] })
  async findDiscovery() {
    return await this.productService.findDiscovery();
  }

  @Get('/suggestion')
  @Public()
  @ApiOperation({ summary: 'Get suggestion Products' })
  @ApiOkResponse({ type: [ProductResponseDto] })
  async findSuggestion() {
    return await this.productService.findDiscovery();
  }

  @Get('/:productId')
  @Public()
  @ApiOperation({ summary: 'Get Product Detail by productId' })
  @ApiOkResponse({ type: ProductResponseDto })
  async findByProductId(@Param('productId') productId: number) {
    return await this.productService.findDetail(productId);
  }

  @Delete('/all')
  @Public()
  async deleteAll() {
    await this.productService.deleteAll();
  }

  @Delete('/one')
  @Public()
  async deleteOne(@Query('productId') productId: number) {
    await this.productService.deleteByProductId(Number(productId));
  }
}
