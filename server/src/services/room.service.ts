import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/entities/room.entity';
import { CreateRoomBody } from 'src/dtos/hotel/room.dto';
import { Hotel } from 'src/entities/hotel.entity';
import { RoomOpt } from 'src/entities/roomOpt.entity';
import uploadToAzureBlobStorage, {
  deleteFromAzureBlobStorage,
} from 'src/utils/azureBlob';
@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
    @InjectRepository(RoomOpt)
    private roomOptRepository: Repository<RoomOpt>,
  ) {}
  async importRoom(body) {
    const rooms = body.map((item) => {
      return this.roomRepository.create({
        id: item.id,
        name: item.name,
        isSmoking: item.isSmoking,
        area: item.area,
        facilitiesRoom: item.facilitiesRoom,
        hotelId: item.hotelId,
        images: JSON.stringify(item.images),
      });
    });

    const savePromises = rooms.map((room) => this.roomRepository.save(room));

    await Promise.all(savePromises);
  }
  async createRoom(files: Array<Express.Multer.File>, body: CreateRoomBody) {
    const hotel = await this.hotelRepository.findOne({
      where: { id: Number(body.hotelId) },
    });
    if (!hotel) {
      return { status: 'failed', message: "Can't find this hotel." };
    }
    let uploadedUrls = [];
    if (files && files.length > 0) {
      uploadedUrls = await Promise.all(
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
    }
    const data = await this.roomRepository.create({
      hotelId: hotel.id,
      name: body.name,
      area: body.area,
      facilitiesRoom: body.facilities,
      isSmoking: body.isSmoking,
      images: JSON.stringify(uploadedUrls),
    });
    const room = await this.roomRepository.save(data);
    if (!room) {
      return { status: 'failed', message: "Can't create this room." };
    }
    const roomOpts = body.roomOpts.map((item) => {
      return this.roomOptRepository.create({
        name: item.name,
        isRefundable: item.isRefundable,
        numberOfGuest: item.numberOfGuest,
        originalPrice: item.originalPrice,
        price: item.price,
        bed: item.bedType,
        roomId: room.id,
        roomLeft: item.roomLeft,
      });
    });
    const savePromises = roomOpts.map((roomOpt) =>
      this.roomOptRepository.save(roomOpt),
    );
    await Promise.all(savePromises);
    return { status: 'success' };
  }
  async updateRoom(files: Array<Express.Multer.File>, body: CreateRoomBody) {
    const connectionString = process.env.AZURE_CONNECTION_STRING as string;
    const containerName = 'shopcartctn';
    let imageUrls = body.oldImageUrls;
    if (files && files.length > 0) {
      const uploadedUrls = await Promise.all(
        files.map(async (file) => {
          const imageBuffer = file.buffer;
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
      if (oldImageUrls) {
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
    await this.roomOptRepository.delete({ roomId: body.roomId });

    await this.roomRepository.update(
      { id: body.roomId },
      {
        name: body.name,
        area: body.area,
        facilitiesRoom: body.facilities,
        isSmoking: body.isSmoking,
        images: imageUrls,
      },
    );
    const roomOpts = body.roomOpts.map((item) => {
      return this.roomOptRepository.create({
        name: item.name,
        isRefundable: item.isRefundable,
        numberOfGuest: item.numberOfGuest,
        originalPrice: item.originalPrice,
        price: item.price,
        bed: item.bedType,
        roomId: body.roomId,
        roomLeft: item.roomLeft,
      });
    });
    const savePromises = roomOpts.map((roomOpt) =>
      this.roomOptRepository.save(roomOpt),
    );
    await Promise.all(savePromises);
    return { status: 'success' };
  }
  async deleteRoom(body: { roomId: number; oldImageUrls: string }) {
    const connectionString = process.env.AZURE_CONNECTION_STRING as string;
    const containerName = 'shopcartctn';
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
    const deleteResult: DeleteResult = await this.roomOptRepository.delete({
      roomId: body.roomId,
    });
    if (deleteResult.affected && deleteResult.affected > 0) {
    } else {
      return { status: 'failed', message: "Can't delete this room." };
    }
    const deleteResult2: DeleteResult = await this.roomRepository.delete({
      id: body.roomId,
    });
    if (deleteResult2.affected && deleteResult2.affected > 0) {
    } else {
      return { status: 'failed', message: "Can't delete this room." };
    }
    return { status: 'success' };
  }
}
