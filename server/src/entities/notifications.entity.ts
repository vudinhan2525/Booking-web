import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Notifications {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  header: string;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  link: string;

  @Column({
    default: false,
  })
  isRead: boolean;

  @Column({ nullable: false })
  createdAt: string;

  @Column({
    default: false,
  })
  isGlobal: boolean;

  @ManyToOne(() => User, (user) => user.notifications, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  userId: number;
}
