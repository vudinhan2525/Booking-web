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
    console.log(body);
    const room = this.roomRepository.create({
      area: 45,
      facilitiesRoom: 'Non-smoking,Shower,Seating area,Wifi',
      hotelId: 6,
      images:
        'https://shopcartimg2.blob.core.windows.net/shopcartctn/pexels-boonkong-boonpeng-442952-1134176.jpg',
    });
    await this.roomRepository.save(room);
  }
}
