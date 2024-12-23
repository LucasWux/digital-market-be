import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UserId } from 'src/decorators/user-payload.decorator';
import { Public } from 'src/decorators/public.decorator';
import { QueryRatingDto } from './dto/query-rating.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RatingResponse } from './dto/response-rating.dto';

@Controller('rating')
@ApiTags('Rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post('/upsert')
  @ApiOkResponse({ type: RatingResponse })
  async upsert(
    @UserId() userId: number,
    @Body() createRatingDto: CreateRatingDto,
  ) {
    return await this.ratingService.upsert(userId, createRatingDto);
  }

  @Get('/product')
  @Public()
  @ApiOkResponse({ type: [RatingResponse] })
  async findAll(@Query() dto: QueryRatingDto) {
    return this.ratingService.findRatingByProductId(dto.productId);
  }
}
