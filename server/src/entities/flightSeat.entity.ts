import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Flight } from './flight.entity';
@Entity()
export class FlightSeat {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  cabinBaggage: number;
  @Column()
  baggage: number;
  @Column()
  price: number;
  @Column()
  isRefundable: boolean;
  @Column()
  isReschedule: boolean;

  @Column({ default: 0 })
  refundablePrice: number;

  @Column({ default: 0 })
  reschedulePrice: number;

  @Column()
  facilities: string;

  @Column({
    type: 'enum',
    enum: ['Economy', 'Business', 'First Class'],
    default: 'Economy',
  })
  seatType: string;

  @Column()
  seatLeft: number;
  @ManyToOne(() => Flight, (flight) => flight.flightSeats)
  @JoinColumn({ name: 'flightId' })
  flight: Flight;
  @Column()
  flightId: number;
}
