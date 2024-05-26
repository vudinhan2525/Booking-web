import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomOpt } from 'src/entities/roomOpt.entity';
@Injectable()
export class RoomOptService {
  constructor(
    @InjectRepository(RoomOpt)
    private roomOptRepository: Repository<RoomOpt>,
  ) {}
  async importHotel(body) {
    for (let i = 0; i < body.length; i++) {
      const room = this.roomOptRepository.create({
        name: body[i].name,
        isRefundable: body[i].isRefundable,
        numberOfGuest: body[i].numberOfGuest,
        originalPrice: body[i].originalPrice,
        bed: body[i].bed,
        price: body[i].price,
        roomLeft: body[i].roomLeft,
        roomId: body[i].roomId,
      });
      await this.roomOptRepository.save(room);
    }
  }
}
