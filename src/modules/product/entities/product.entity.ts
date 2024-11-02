import { BaseEntity } from 'src/utils/base/base-entity';
import { productTypeTransformer } from 'src/utils/tranformers/product-tranformer';
import { Column, Entity } from 'typeorm';

export enum ProductStatus {
  SoldOut = 'SoldOut',
  InStock = 'InStock',
}

export enum ProductType {
  Electronic = 'Electronic',
  Groceries = 'Groceries',
}

@Entity()
export class Product extends BaseEntity {
  @Column({
    type: 'enum',
    enum: ProductStatus,
    nullable: false,
    default: ProductStatus.InStock,
  })
  status: ProductStatus;

  @Column({ nullable: false, default: 0 })
  Price: number;

  @Column({ nullable: false, default: 0 })
  discount: number;

  @Column({ nullable: false, default: 0 })
  rating: number;

  @Column({ nullable: false, default: 0 })
  remaining: number;

  @Column({ nullable: false, default: 0 })
  totalLike: number;

  @Column({ nullable: false, default: 0 })
  totalReview: number;

  @Column({ nullable: false, default: 0 })
  ownerId: number;

  @Column({ nullable: true, type: 'text', transformer: productTypeTransformer })
  type?: ProductType[];
}
