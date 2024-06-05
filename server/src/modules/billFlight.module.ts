import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillFlightController } from 'src/controllers/billFlight.controller';
import { BillFlight } from 'src/entities/billFlight.entity';
import { BillFlightService } from 'src/services/billFlight.service';

@Module({
  imports: [TypeOrmModule.forFeature([BillFlight])],
  controllers: [BillFlightController],
  providers: [BillFlightService],
})
export class BillFlightModule {}
