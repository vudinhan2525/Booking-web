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

    const billHotel = await this.billHotelRepository.create({
      id: uniqueId,
      price: body.price,
      isRefundable: body.isRefundable,
      isReschedule: body.isReschedule,
      numberOfPassenger: body.numberOfPassenger,
      bed: body.bed,
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
}
