import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating) private readonly repo: Repository<Rating>,
  ) {}
  async upsert(userId: number, createRatingDto: CreateRatingDto) {
    const isExist = await this.repo.findOneBy({
      userId,
      productId: createRatingDto.productId,
    });

    if (isExist) {
      await this.repo.update(
        { userId, productId: createRatingDto.productId },
        {
          ...(createRatingDto.comment
            ? { comment: createRatingDto.comment }
            : {}),
          ratingPoint: createRatingDto.ratingPoint,
        },
      );
    } else {
      await this.repo.save({ userId, ...createRatingDto });
    }
    return await this.repo.findOneBy({
      userId,
      productId: createRatingDto.productId,
    });
  }

  async findRatingByProductId(productId: number) {
    return await this.repo.findBy({ productId });
  }
}
