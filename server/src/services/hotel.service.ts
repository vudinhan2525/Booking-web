import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from 'src/entities/hotel.entity';
import { HotelBody } from 'src/dtos/hotel/hotel.dto';
import { Room } from 'src/entities/room.entity';
import { RoomOpt } from 'src/entities/roomOpt.entity';
import { getDistance } from 'geolib';
import { IFilterHotel } from 'src/interfaces/filterObj';
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
    const savePromises = hotels.map((hotel) =>
      this.hotelRepository.save(hotel),
    );
    await Promise.all(savePromises);
  }
  async getHotel(body: { long: number; lat: number; filter: IFilterHotel }) {
    const datas = await this.hotelRepository
      .createQueryBuilder('hotel')
      .getMany();
    const distanceFromPoint = (hotel) => {
      const hotelLat = Number(hotel.lat);
      const hotelLong = Number(hotel.long);
      const distance = getDistance(
        { latitude: body.lat, longitude: body.long },
        { latitude: hotelLat, longitude: hotelLong },
      );
      return distance <= 30000;
    };
    const hotels = datas.filter(distanceFromPoint);
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
    if (body.filter.sortBy === 'Lowest Price') {
      const result = hotelWithRooms.sort((a, b) => {
        let minA = 10000000;
        let minB = 10000000;
        if (a?.rooms.length > 0 && a.rooms[0]?.roomOpts.length > 0) {
          minA = a.rooms[0].roomOpts[0].price;
        }
        if (b?.rooms.length > 0 && b.rooms[0]?.roomOpts.length > 0) {
          minB = b.rooms[0].roomOpts[0].price;
        }
        return minA - minB;
      });
      return result;
    } else if (body.filter.sortBy === 'Highest Price') {
      const result = hotelWithRooms.sort((a, b) => {
        let minA = 10000000;
        let minB = 10000000;
        if (a?.rooms.length > 0 && a.rooms[0]?.roomOpts.length > 0) {
          minA = a.rooms[0].roomOpts[0].price;
        }
        if (b?.rooms.length > 0 && b.rooms[0]?.roomOpts.length > 0) {
          minB = b.rooms[0].roomOpts[0].price;
        }
        return minB - minA;
      });
      return result;
    } else if (body.filter.sortBy === 'Top Rating') {
      const result = hotelWithRooms.sort((a, b) => {
        return b.rating - a.rating;
      });
      return result;
    }
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
