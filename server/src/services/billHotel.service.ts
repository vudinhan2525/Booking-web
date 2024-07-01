import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BillHotel } from 'src/entities/billHotel.entity';
import { BillHotelBody } from 'src/dtos/bill/billHotel.dto';
import { generateUniqueId } from 'src/utils/generateId';
@Injectable()
export class BillHotelService {
  constructor(
    @InjectRepository(BillHotel)
    private billHotelRepository: Repository<BillHotel>,
  ) {}
  async addBillHotel(body: BillHotelBody) {
    //can you generate id here and check if if duplicate 5 times

    const uniqueId = await this.generateUniqueBillHotelId();
    const now = new Date();

    const billHotel = await this.billHotelRepository.create({
      id: uniqueId,
      price: body.price,
      status: body.status,
      isRefundable: body.isRefundable,
      isReschedule: body.isReschedule,
      numberOfPassenger: body.numberOfPassenger,
      numberOfRoom: body.numberOfRoom,
      dateCheckIn: body.dateCheckIn,
      dateCheckOut: body.dateCheckOut,
      bed: body.bed,
      createdAt: now.toString(),
      duration: body.duration,
      nameRoom: body.nameRoom,
      nameHotel: body.nameHotel,
      userId: body.userId,
      adminId: body.adminId,
    });
    const result = await this.billHotelRepository.save(billHotel);
    return result;
  }
  private async generateUniqueBillHotelId(attempts = 0): Promise<string> {
    const uniqueId = generateUniqueId();
    const existingBillHotel = await this.billHotelRepository.findOne({
      where: { id: uniqueId },
    });

    if (!existingBillHotel) {
      return uniqueId;
    }

    if (attempts >= 5) {
      throw new InternalServerErrorException('Could not generate a unique ID');
    }

    return this.generateUniqueBillHotelId(attempts + 1);
  }
  async getBillHotel(
    body: { userId: number; from: string },
    page: number,
    limit: number,
  ) {
    const billHotels = await this.billHotelRepository
      .createQueryBuilder('bill_hotel')
      .where('bill_hotel.userId = :userId', { userId: body.userId })
      .getMany();

    // Filter and sort the bills in memory
    const fromDate = new Date(body.from);
    const filteredBills = billHotels
      .filter((bill) => new Date(bill.createdAt) >= fromDate)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

    const totalCount = filteredBills.length ? filteredBills.length : 0;
    // Paginate the results
    const offset = (page - 1) * limit;
    const paginatedBills = filteredBills.slice(offset, offset + limit);

    return { bills: paginatedBills, totalCount };
  }
  async getBillHotelForAdmin(body: {
    adminId: number;
    search: string;
    status: string;
  }) {
    let query = await this.billHotelRepository
      .createQueryBuilder('bill_hotel')
      .where('adminId = :adminId', { adminId: body.adminId });
    if (body.status) {
      if (body.status !== 'all') {
        query = query.andWhere('status = :status', { status: body.status });
      }
    }
    if (body.search) {
      query = query.andWhere('id LIKE :searchText', {
        searchText: `%${body.search}%`,
      });
    }
    const billHotels = await query.getMany();
    return billHotels;
  }
  async checkIn(body: {
    billHotelId: string;
    floor: string;
    roomCode: string;
  }) {
    const billHotel = await this.billHotelRepository.findOne({
      where: { id: body.billHotelId },
    });

    if (billHotel) {
      billHotel.floor = body.floor;
      billHotel.roomCode = body.roomCode;
      billHotel.isCheckIn = true;
      billHotel.isPayment = true;

      const updatedBillHotel = await this.billHotelRepository.save(billHotel);
      return updatedBillHotel;
    } else {
      throw new Error('Bill not found');
    }
  }
  async checkOut(body: { billHotelId: string }) {
    const billHotel = await this.billHotelRepository.findOne({
      where: { id: body.billHotelId },
    });

    if (billHotel) {
      billHotel.status = 'completed';
      billHotel.isCheckOut = true;

      const updatedBillHotel = await this.billHotelRepository.save(billHotel);
      return updatedBillHotel;
    } else {
      throw new Error('Bill not found');
    }
  }
}
