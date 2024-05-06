import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as crypto from 'crypto';
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

  @Column()
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
}
