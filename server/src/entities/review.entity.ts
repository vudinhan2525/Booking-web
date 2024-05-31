import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hotel } from './hotel.entity';
import { User } from './user.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  rating: number;
  @Column({
    type: 'nvarchar',
    length: 5000,
    nullable: false,
  })
  summary: string;
  @Column({ nullable: false })
  dateRate: Date;

  @Column()
  hotelId: number;

  @ManyToOne(() => Hotel)
  @JoinColumn({ name: 'hotelId' })
  hotel: Hotel;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    type: 'json',
    nullable: true,
  })
  imageUrls: string;

  @Column({
    type: 'nvarchar',
    length: 5000,
    nullable: true,
  })
  reply: string;
  @Column({ nullable: true })
  replyDate: Date;
}
