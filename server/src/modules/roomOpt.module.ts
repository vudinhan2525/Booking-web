import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomOptController } from 'src/controllers/roomOpt.controller';
import { RoomOpt } from 'src/entities/roomOpt.entity';
import { RoomOptService } from 'src/services/roomOpt.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoomOpt])],
  controllers: [RoomOptController],
  providers: [RoomOptService],
})
export class RoomOptModule {}
