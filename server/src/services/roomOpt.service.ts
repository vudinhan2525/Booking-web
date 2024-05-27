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
  async importRoomOpt(body) {
    const roomOptions = body.map((item) => {
      return this.roomOptRepository.create({
        name: item.name,
        isRefundable: item.isRefundable,
        numberOfGuest: item.numberOfGuest,
        originalPrice: item.originalPrice,
        bed: item.bed,
        price: item.price,
        roomLeft: item.roomLeft,
        roomId: item.roomId,
      });
    });

    const savePromises = roomOptions.map((room) =>
      this.roomOptRepository.save(room),
    );

    await Promise.all(savePromises);
  }
}
