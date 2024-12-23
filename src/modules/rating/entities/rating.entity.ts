import { BaseEntity } from 'src/utils/base/base-entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Rating extends BaseEntity {
  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  productId: number;

  @Column({ nullable: false })
  ratingPoint: number;

  @Column({ nullable: true })
  comment: string;
}
