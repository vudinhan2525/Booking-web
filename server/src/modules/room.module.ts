import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomController } from 'src/controllers/room.controller';
import { Room } from 'src/entities/room.entity';
import { RoomService } from 'src/services/room.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
