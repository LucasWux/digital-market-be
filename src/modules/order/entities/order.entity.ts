import { BaseEntity } from 'src/utils/base/base-entity';
import { Column, Entity } from 'typeorm';

export enum OrderStatus {
  active = 'active',
  canceled = 'canceled',
  purchased = 'purchased',
  preparing = 'preparing',
  inCart = 'inCart',
}

@Entity()
export class Order extends BaseEntity {
  @Column({
    type: 'enum',
    enum: OrderStatus,
    nullable: false,
    default: OrderStatus.active,
  })
  status: OrderStatus;

  @Column({ nullable: false })
  ownerId: number;

  @Column({ nullable: false })
  productId: number;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  amount: number;

  @Column({ nullable: false })
  createdTime: number;

  @Column({ nullable: true })
  purchasedTime: number;
}
