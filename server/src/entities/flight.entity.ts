import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fromAirport: string;
  @Column()
  toAirport: string;
  @Column()
  from: string;
  @Column()
  to: string;
  @Column()
  fromCode: string;
  @Column()
  toCode: string;
  @Column()
  airline: string;
  @Column()
  flightCode: string;
  @Column()
  seatType: string;
  @Column()
  airplane: string;
  @Column()
  departureTime: string;
  @Column()
  arrivalTime: string;
  @Column()
  price: number;
  @Column()
  seatLeft: number;
}
