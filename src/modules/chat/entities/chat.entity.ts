import { BaseEntity } from 'src/utils/base/base-entity';
import { stringsTypeTransformer } from 'src/utils/tranformers/strings-tranformer';
import { Column, Entity } from 'typeorm';

export enum ChatStatus {
  active = 'active',
  hidden = 'hidden',
}

@Entity()
export class Chat extends BaseEntity {
  @Column({
    type: 'enum',
    enum: ChatStatus,
    nullable: false,
    default: ChatStatus.active,
  })
  status: ChatStatus;

  @Column({ nullable: false })
  senderId: number;

  @Column({ nullable: false })
  receiverId: number;

  @Column({ nullable: false })
  content: string;

  @Column({ type: 'text', nullable: true, transformer: stringsTypeTransformer })
  image: string[];

  @Column({ nullable: false })
  createTime: number;
}
