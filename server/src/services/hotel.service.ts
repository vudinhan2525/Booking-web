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
    const hotels = body.map((item) => {
      return this.hotelRepository.create({
        id: item.id,
        name: item.name,
        accomodation: item.accomodation,
        address: item.address,
        location: item.location,
        long: item.long,
        lat: item.lat,
        summary: item.summary,
        facilities: item.facilities,
        images:
          'https://shopcartimg2.blob.core.windows.net/shopcartctn/pexels-boonkong-boonpeng-442952-1134176.jpg',
      });
    });
    const savePromises = hotels.map((hotel) => this.roomRepository.save(hotel));

    await Promise.all(savePromises);
  }
  async getHotel() {
    const hotels = await this.hotelRepository
      .createQueryBuilder('hotel')
      .getMany();

    const hotelWithRooms = await Promise.all(
      hotels.map(async (hotel) => {
        const rooms = await this.roomRepository
          .createQueryBuilder('room')
          .leftJoinAndSelect('room.roomOpts', 'roomOpt')
          .where('room.hotelId = :hotelId', { hotelId: hotel.id })
          .orderBy('roomOpt.price')
          .getMany();
        const sortedRooms = rooms.sort((a, b) => {
          const minPriceA = Math.min(...a.roomOpts.map((opt) => opt.price));
          const minPriceB = Math.min(...b.roomOpts.map((opt) => opt.price));
          return minPriceA - minPriceB;
        });
        return { ...hotel, rooms: sortedRooms };
      }),
    );
    return hotelWithRooms;
  }
  async getOneHotel(hotelId: number) {
    const hotel = await this.hotelRepository
      .createQueryBuilder('hotel')
      .where('id = :hotelId', { hotelId })
      .getOne();
    if (!hotel) {
      return { status: 'failed', message: 'Cannot found hotel with this id!' };
    }
    const rooms = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.roomOpts', 'roomOpt')
      .where('room.hotelId = :hotelId', { hotelId: hotel.id })
      .orderBy('roomOpt.price')
      .getMany();
    const sortedRooms = rooms.sort((a, b) => {
      const minPriceA = Math.min(...a.roomOpts.map((opt) => opt.price));
      const minPriceB = Math.min(...b.roomOpts.map((opt) => opt.price));
      return minPriceA - minPriceB;
    });
    const result = { ...hotel, rooms: sortedRooms };
    return { status: 'success', data: result };
  }
}
