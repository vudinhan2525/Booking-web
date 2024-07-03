import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from 'src/entities/hotel.entity';
import { HotelBody, HotelUpdateBody } from 'src/dtos/hotel/hotel.dto';
import { Room } from 'src/entities/room.entity';
import { RoomOpt } from 'src/entities/roomOpt.entity';
import { getDistance } from 'geolib';
import { IFilterHotel } from 'src/interfaces/filterObj';
import uploadToAzureBlobStorage, {
  deleteFromAzureBlobStorage,
} from 'src/utils/azureBlob';
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
  async createHotel(
    files: Array<Express.Multer.File>,
    body: HotelBody,
    adminId: number,
  ) {
    const checkHotelName = await this.hotelRepository.findOne({
      where: { name: body.name },
    });
    if (checkHotelName) {
      return { status: 'failed', message: 'Already exist this hotel name.' };
    }
    const uploadedUrls = await Promise.all(
      files.map(async (file) => {
        const imageBuffer = file.buffer;
        const containerName = 'shopcartctn';
        const blobName = `${file.originalname}-${Date.now()}`;
        const connectionString = process.env.AZURE_CONNECTION_STRING as string;
        const imageUrl = await uploadToAzureBlobStorage(
          imageBuffer,
          containerName,
          blobName,
          connectionString,
        );
        return imageUrl;
      }),
    );
    const hotel = await this.hotelRepository.create({
      name: body.name,
      accomodation: body.accomodation,
      address: body.address,
      location: body.location,
      long: Number(body.long),
      lat: Number(body.lat),
      summary: body.summary,
      facilities: body.facilities,
      adminId: adminId,
      images: JSON.stringify(uploadedUrls),
    });
    const result = await this.hotelRepository.save(hotel);
    return { status: 'success', data: result };
  }
  async updateHotel(files: Array<Express.Multer.File>, body: HotelUpdateBody) {
    const connectionString = process.env.AZURE_CONNECTION_STRING as string;
    const containerName = 'shopcartctn';
    let imageUrls = body.oldImageUrls;
    if (files && files.length > 0) {
      const uploadedUrls = await Promise.all(
        files.map(async (file) => {
          const imageBuffer = file.buffer;
          const containerName = 'shopcartctn';
          const blobName = `${file.originalname}-${Date.now()}`;
          const connectionString = process.env
            .AZURE_CONNECTION_STRING as string;
          const imageUrl = await uploadToAzureBlobStorage(
            imageBuffer,
            containerName,
            blobName,
            connectionString,
          );
          return imageUrl;
        }),
      );
      imageUrls = JSON.stringify(uploadedUrls);
      const oldImageUrls = JSON.parse(body.oldImageUrls);
      if (oldImageUrls && oldImageUrls.length > 0) {
        await Promise.all(
          oldImageUrls.map(async (oldImageUrl) => {
            const oldBlobName = oldImageUrl.substring(
              oldImageUrl.lastIndexOf('/') + 1,
            );
            await deleteFromAzureBlobStorage(
              containerName,
              oldBlobName,
              connectionString,
            );
          }),
        );
      }
    }
    const hotel = await this.hotelRepository.findOne({
      where: { id: Number(body.hotelId) },
    });
    if (!hotel) {
      return { status: 'failed', message: "Can't find this hotel." };
    }
    hotel.name = body.name;
    hotel.accomodation = body.accomodation;
    hotel.address = body.address;
    hotel.location = body.location;
    hotel.long = Number(body.long);
    hotel.lat = Number(body.lat);
    hotel.summary = body.summary;
    hotel.facilities = body.facilities;
    hotel.images = imageUrls;
    const data = await this.hotelRepository.save(hotel);
    const rooms = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.roomOpts', 'roomOpt')
      .where('room.hotelId = :hotelId', { hotelId: data.id })
      .orderBy('roomOpt.price')
      .getMany();
    const sortedRooms = rooms.sort((a, b) => {
      const minPriceA = Math.min(...a.roomOpts.map((opt) => opt.price));
      const minPriceB = Math.min(...b.roomOpts.map((opt) => opt.price));
      return minPriceA - minPriceB;
    });
    const result = {
      ...data,
      rooms: sortedRooms,
      images: JSON.parse(data.images),
    };
    return { status: 'success', data: result };
  }
  async deleteHotel(body: { hotelId: number }) {
    const connectionString = process.env.AZURE_CONNECTION_STRING as string;
    const containerName = 'shopcartctn';
    const hotel = await this.hotelRepository.findOne({
      where: { id: Number(body.hotelId) },
    });
    if (!hotel) {
      return { status: 'failed', message: "Can't find this hotel." };
    }
    const rooms = await this.roomRepository
      .createQueryBuilder('room')
      .where('hotelId = :id', { id: hotel.id })
      .getMany();
    await Promise.all(
      rooms.map(async (room) => {
        if (
          room.images &&
          Array.isArray(room.images) &&
          (room.images as unknown as string[]).length > 0
        ) {
          await Promise.all(
            (room.images as unknown as string[]).map(async (oldImageUrl) => {
              const oldBlobName = oldImageUrl.substring(
                oldImageUrl.lastIndexOf('/') + 1,
              );
              await deleteFromAzureBlobStorage(
                containerName,
                oldBlobName,
                connectionString,
              );
            }),
          );
        }
        await this.roomOptRepository.delete({ roomId: room.id });

        await this.roomRepository.delete({ id: room.id });
      }),
    );
    if (
      hotel.images &&
      Array.isArray(hotel.images) &&
      (hotel.images as unknown as string[]).length > 0
    ) {
      await Promise.all(
        (hotel.images as unknown as string[]).map(async (oldImageUrl) => {
          const oldBlobName = oldImageUrl.substring(
            oldImageUrl.lastIndexOf('/') + 1,
          );
          await deleteFromAzureBlobStorage(
            containerName,
            oldBlobName,
            connectionString,
          );
        }),
      );
    }
    await this.hotelRepository.delete({ id: hotel.id });

    return { status: 'success' };
  }
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
  async getHotel(
    body: {
      long: number;
      lat: number;
      filter: IFilterHotel;
      searchTxt?: string | null;
    },
    page: number,
    limit: number,
  ) {
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
    //Filter by search text
    if (body.searchTxt) {
      query = query.andWhere('name LIKE :text', {
        text: `%${body.searchTxt}%`,
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
    //
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
    // can you change this i want get totalCount and hotels pagination after filter by distance
    const totalCount = hotels.length;

    // Apply pagination
    if (page && limit) {
      const offset = (page - 1) * limit;
      hotels = hotels.slice(offset, offset + limit);
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
    if (body.filter.sortBy) {
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
        return { hotelWithRooms: result, totalCount };
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
        return { hotelWithRooms: result, totalCount };
      } else if (body.filter.sortBy === 'Top Rating') {
        const result = hotelWithRooms.sort((a, b) => {
          return b.rating - a.rating;
        });
        return { hotelWithRooms: result, totalCount };
      }
    }
    return { hotelWithRooms, totalCount };
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
  async getHotelFromAdmin(body: {
    adminId: number;
    accomodation: string;
    searchText: string;
  }) {
    let query = await this.hotelRepository
      .createQueryBuilder('hotel')
      .where('adminId = :aId', { aId: body.adminId })
      .andWhere('accomodation = :acc', { acc: body.accomodation });
    if (body.searchText) {
      query = query.andWhere('hotel.name LIKE :searchText', {
        searchText: `%${body.searchText}%`,
      });
    }
    const hotels = await query.getMany();
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
}
