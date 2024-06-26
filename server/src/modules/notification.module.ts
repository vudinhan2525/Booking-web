import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationController } from 'src/controllers/notification.controller';
import { Notifications } from 'src/entities/notifications.entity';
import { NotificationService } from 'src/services/notification.service';

@Module({
  imports: [TypeOrmModule.forFeature([Notifications])],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
