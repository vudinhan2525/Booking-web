import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import * as crypto from 'crypto';
import { Hotel } from './hotel.entity';
import { BillFlight } from './billFlight.entity';
import { Notifications } from './notifications.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    charset: 'utf8',
    collation: 'utf8_general_ci',
  })
  firstName: string;

  @Column({
    charset: 'utf8',
    collation: 'utf8_general_ci',
  })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ default: '' })
  savedHotel: string;

  @Column({ default: '' })
  savedFlight: string;

  @Column({
    type: 'enum',
    enum: ['user', 'admin'],
    default: 'user',
  })
  role: string;

  @Column({ select: false })
  password: string;
  @Column({ nullable: true })
  passwordConfirm: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  passwordResetToken: string;
  @Column({ nullable: true })
  passwordResetExpires: Date;
  @Column({ nullable: true })
  passwordChangeAt: Date;

  createPasswordResetToken(): string {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
    return resetToken;
  }

  @OneToMany(() => Hotel, (hotel) => hotel.admin)
  hotels: Hotel[];

  @OneToMany(() => BillFlight, (billFlight) => billFlight.user)
  billFlights: BillFlight[];

  @OneToMany(() => Notifications, (notification) => notification.user)
  notifications: Notifications[];
}
