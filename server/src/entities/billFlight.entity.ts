import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
@Entity()
export class BillFlight {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.billFlights)
  @JoinColumn({ name: 'userId' })
  user: User;
  @Column()
  userId: number;

  @Column()
  createdAt: Date;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  airline: string;

  @Column()
  flightCode: string;

  @Column()
  departureTime: Date;

  @Column()
  arrivalTime: Date;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  passenger: string;
}
