import { BaseEntity } from 'src/utils/base/base-entity';
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

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  birthDay: number;

  @Column({ nullable: true })
  gender: boolean; // 0 stand for female, 1 stand for male

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  address: string;
}
