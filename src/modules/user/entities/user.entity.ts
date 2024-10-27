import { BaseEntity } from 'src/utils/entity/base-entity';
import { Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class User extends BaseEntity {
  @Column({ nullable: false })
  userName: string;

  @Column({ nullable: false })
  @Exclude({ toPlainOnly: true })
  @ApiHideProperty()
  password: string;
}
