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
        rating: item.rating,
        adminId: item.adminId,
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
    const accomodations = body.filter.accomodation.split(',');
    const facilities = body.filter.facilities.split(',');
    const ratings = body.filter.rating.split(',').map(Number);
    let query = this.hotelRepository.createQueryBuilder('hotel');

    //Filter by accomodations
    if (accomodations.length > 0) {
      query = query.where('hotel.accomodation IN (:...accomodations)', {
        accomodations,
      });
    }
    //Filter by facilities
    if (body.filter.facilities !== '') {
      // Filter by facilities
      facilities.forEach((facility, index) => {
        query = query.andWhere(
          `FIND_IN_SET(:facility${index}, hotel.facilities)`,
          { [`facility${index}`]: facility.trim() },
        );
      });
    }
    //Filter by rating
    if (body.filter.rating !== '') {
      const ratingConditions = ratings
        .map((rating, index) => {
          return `hotel.rating BETWEEN :ratingStart${index} AND :ratingEnd${index}`;
        })
        .join(' OR ');

      const ratingParams = ratings.reduce((params, rating, index) => {
        params[`ratingStart${index}`] = rating;
        params[`ratingEnd${index}`] = rating + 0.99;
        return params;
      }, {});

      query = query.andWhere(`(${ratingConditions})`, ratingParams);
    }
    let hotels = await query.getMany();

    //Filter by range
    const distanceFromPoint = (hotel) => {
      const hotelLat = Number(hotel.lat);
      const hotelLong = Number(hotel.long);
      const distance = getDistance(
        { latitude: body.lat, longitude: body.long },
        { latitude: hotelLat, longitude: hotelLong },
      );
      return distance <= 30000;
    };
    if (body.long && body.lat) {
      const datas = hotels.filter(distanceFromPoint);
      hotels = datas;
    }
    let hotelWithRooms = await Promise.all(
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
    //Filter by price
    if (body.filter.priceMax) {
      const newArr = hotelWithRooms.filter((hotel) => {
        if (
          hotel?.rooms[0]?.roomOpts[0].price <= body.filter.priceMax &&
          hotel?.rooms[0]?.roomOpts[0].price >= body.filter.priceMin
        ) {
          return true;
        }
        return false;
      });
      hotelWithRooms = newArr;
    }
    //Sort hotels
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
