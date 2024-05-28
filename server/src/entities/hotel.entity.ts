import { accomodationType } from 'src/utils/dataHotel';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Room } from './room.entity';
@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: accomodationType,
    default: 'Others',
  })
  accomodation: string;

  @Column()
  address: string;
  @Column()
  location: string;
  @Column('decimal', { precision: 18, scale: 15 })
  long: number;
  @Column('decimal', { precision: 18, scale: 15 })
  lat: number;
  @Column('decimal', {
    precision: 10,
    scale: 2,
    default: 0,
  })
  rating: number;
  @Column({
    default: 0,
  })
  numberOfRating: number;
  @Column({
    type: 'nvarchar',
    length: 5000,
  })
  summary: string;
  @Column()
  facilities: string;
  @Column()
  images: string;
  @Column({
    default: 0,
  })
  roomLeft: number;
  @OneToMany(() => Room, (room) => room.hotel)
  rooms: Room[];
}
