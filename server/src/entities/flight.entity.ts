import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FlightSeat } from './flightSeat.entity';
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
  departureTime: Date;
  @Column()
  arrivalTime: Date;

  @OneToMany(() => FlightSeat, (flightSeat) => flightSeat.flight)
  flightSeats: FlightSeat[];
}
