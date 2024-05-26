import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from './room.entity';

@Entity()
export class RoomOpt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isRefundable: boolean;

  @Column()
  numberOfGuest: number;

  @Column()
  originalPrice: number;

  @Column()
  price: number;

  @Column()
  roomLeft: number;

  @Column()
  bed: string;

  @ManyToOne(() => Room, (room) => room.roomOpts)
  @JoinColumn({ name: 'roomId' })
  room: Room;

  @Column()
  roomId: number;
}
