import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Coupon {
  @PrimaryColumn()
  code: string;

  @Column()
  expiredDate: string;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: true })
  percent: number;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  priceRequire: number;

  @Column({
    default: false,
  })
  isGlobal: boolean;

  @ManyToOne(() => User, (user) => user.coupons, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  userId: number;
}
