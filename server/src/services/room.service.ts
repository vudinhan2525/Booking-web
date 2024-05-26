import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/entities/room.entity';
@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}
  async importHotel(body) {
    for (let i = 0; i < body.length; i++) {
      const room = this.roomRepository.create({
        id: body[i].id,
        name: body[i].name,
        area: body[i].area,
        facilitiesRoom: body[i].facilitiesRoom,
        hotelId: body[i].hotelId,
        images: body[i].images,
      });
      await this.roomRepository.save(room);
    }
  }
}
