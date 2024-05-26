import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from 'src/entities/hotel.entity';
import { HotelBody } from 'src/dtos/hotel/hotel.dto';
import { Room } from 'src/entities/room.entity';
import { RoomOpt } from 'src/entities/roomOpt.entity';
@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(RoomOpt)
    private roomOptRepository: Repository<RoomOpt>,
  ) {}
  async importHotel(body: HotelBody[]) {
    for (let i = 0; i < body.length; i++) {
      const newHotel = this.hotelRepository.create({
        id: body[i].id,
        name: body[i].name,
        accomodation: body[i].accomodation,
        address: body[i].address,
        location: body[i].location,
        long: body[i].long,
        lat: body[i].lat,
        summary: body[i].summary,
        facilities: body[i].facilities,
        images:
          'https://shopcartimg2.blob.core.windows.net/shopcartctn/pexels-boonkong-boonpeng-442952-1134176.jpg',
      });
      await this.hotelRepository.save(newHotel);
    }
  }
  async getHotel() {
    const result = await this.hotelRepository.find();

    return result;
  }
}
