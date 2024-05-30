import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewController } from 'src/controllers/review.controller';
import { Hotel } from 'src/entities/hotel.entity';
import { Review } from 'src/entities/review.entity';
import { User } from 'src/entities/user.entity';
import { ReviewService } from 'src/services/review.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel, Review, User])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
