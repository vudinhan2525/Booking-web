import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
@Entity()
export class BillHotel {
  @PrimaryColumn()
  id: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'completed'],
    default: 'pending',
  })
  status: string;

  @Column()
  price: number;

  @Column()
  isRefundable: boolean;

  @Column()
  isReschedule: boolean;

  @Column()
  dateCheckIn: Date;

  @Column()
  dateCheckOut: Date;

  @Column({
    default: false,
  })
  isCheckIn: boolean;

  @Column({
    default: false,
  })
  isCheckOut: boolean;

  @Column()
  numberOfPassenger: number;

  @Column()
  numberOfRoom: number;

  @Column()
  bed: string;

  @Column()
  nameRoom: string;

  @Column()
  createdAt: Date;

  @Column()
  duration: number;

  @Column()
  nameHotel: string;

  @Column({ default: '' })
  roomCode: string;

  @Column({ default: '' })
  floor: string;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  adminId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'adminId' })
  admin: User;
}
