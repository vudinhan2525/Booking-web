import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Hotel } from './hotel.entity';
import { RoomOpt } from './roomOpt.entity';
@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  area: number;

  @Column()
  facilitiesRoom: string;

  @Column()
  images: string;

  @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
  @JoinColumn({ name: 'hotelId' })
  hotel: Hotel;

  @Column()
  hotelId: number;
  @OneToMany(() => RoomOpt, (roomOpt) => roomOpt.room)
  roomOpts: RoomOpt[];
}
