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
    const rooms = body.map((item) => {
      return this.roomRepository.create({
        id: item.id,
        name: item.name,
        isSmoking: item.isSmoking,
        area: item.area,
        facilitiesRoom: item.facilitiesRoom,
        hotelId: item.hotelId,
        images: item.images,
      });
    });

    const savePromises = rooms.map((room) => this.roomRepository.save(room));

    await Promise.all(savePromises);
  }
}
