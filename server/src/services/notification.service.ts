import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Notifications } from 'src/entities/notifications.entity';
import { NotiBodyDto } from 'src/dtos/noti.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notifications)
    private notiRepository: Repository<Notifications>,
  ) {}
  async addNoti(body: NotiBodyDto) {
    const curDate = new Date();
    const noti = this.notiRepository.create({
      header: body.header,
      content: body.content,
      link: body.link,
      image: body.image,
      createdAt: curDate.toString(),
      isGlobal: body.isGlobal,
      userId: body.userId,
    });

    // Save the created notification to the database
    return await this.notiRepository.save(noti);
  }
  async getNoti(body: { userId: number }) {
    const { userId } = body;
    const notifications = await this.notiRepository
      .createQueryBuilder('notification')
      .where('notification.isGlobal = :isGlobal', { isGlobal: true })
      .orWhere('notification.userId = :userId', { userId })
      .getMany();

    return notifications;
  }
  async readNoti(body: { notiId: number }) {
    const { notiId } = body;

    try {
      const notification = await this.notiRepository.findOne({
        where: { id: notiId },
      });

      if (!notification) {
        throw new Error(`Notification with id ${notiId} not found`);
      }

      notification.isRead = true;
      await this.notiRepository.save(notification);

      return { status: 'success' };
    } catch (error) {
      return { status: 'failed' };
    }
  }
}
