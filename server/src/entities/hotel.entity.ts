import { accomodationType } from 'src/utils/dataHotel';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Room } from './room.entity';
import { Review } from './review.entity';
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
  @OneToMany(() => Room, (room) => room.hotel)
  rooms: Room[];

  @OneToMany(() => Review, (review) => review.hotel)
  reviews: Review[];

  @Column({ default: 0 })
  oneStar: number;
  @Column({ default: 0 })
  twoStar: number;
  @Column({ default: 0 })
  threeStar: number;
  @Column({ default: 0 })
  fourStar: number;
  @Column({ default: 0 })
  fiveStar: number;
}
