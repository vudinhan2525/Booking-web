import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/entities/review.entity';
import uploadToAzureBlobStorage, {
  deleteFromAzureBlobStorage,
} from 'src/utils/azureBlob';
import { ReviewBodyDto } from 'src/dtos/review/review.dto';
import { Hotel } from 'src/entities/hotel.entity';
@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
  ) {}
  async createReview(files: Array<Express.Multer.File>, body: ReviewBodyDto) {
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
    const date = new Date();
    const review = await this.reviewRepository.create({
      rating: Number(body.rating),
      summary: body.summary,
      hotelId: Number(body.hotelId),
      userId: Number(body.userId),
      dateRate: date.toString(),
      imageUrls: JSON.stringify(uploadedUrls),
    });
    const result = await this.reviewRepository.save(review);
    await this.updateHotel(body.hotelId);
    return result;
  }
  getFormattedDateTimeInTimeZone = (offset: number) => {
    const now = new Date();

    // Convert the date to the desired timezone
    const localDate = new Date(now.getTime() + offset * 60 * 60 * 1000);

    // Format the date
    const year = localDate.getUTCFullYear();
    const month = String(localDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(localDate.getUTCDate()).padStart(2, '0');
    const hours = String(localDate.getUTCHours()).padStart(2, '0');
    const minutes = String(localDate.getUTCMinutes()).padStart(2, '0');
    const seconds = String(localDate.getUTCSeconds()).padStart(2, '0');

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
  };
  async getReviews(body: { hotelId: number; userId?: number }) {
    const reviews: Review[] = [];
    if (body.userId) {
      const review = await this.reviewRepository
        .createQueryBuilder('review')
        .leftJoinAndSelect('review.user', 'user')
        .where('hotelId = :hotelId', { hotelId: body.hotelId })
        .andWhere('userId = :userId', { userId: body.userId })
        .getOne();
      if (review) reviews.push(review);
    }
    const reviewsNotFromUser = await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.user', 'user')
      .where('hotelId = :hotelId', { hotelId: body.hotelId })
      .andWhere('review.userId != :userId', { userId: body.userId || 0 })
      .getMany();

    reviews.push(...reviewsNotFromUser);

    return reviews;
  }
  async getReviewsForAdmin(body: { adminId: number; hotelId: number }) {
    if (!body.adminId) {
      return { status: 'failed', message: 'adminId not found.' };
    }
    let query = await this.hotelRepository
      .createQueryBuilder('hotel')
      .where(`adminId = :adminId`, { adminId: body.adminId });
    if (body.hotelId > 0) {
      query = query.andWhere(`id = :hotelId`, { hotelId: body.hotelId });
    }
    const hotels = await query.getMany();
    const fetchReviewsPromises = hotels.map(async (hotel) => {
      return await this.reviewRepository
        .createQueryBuilder('review')
        .leftJoinAndSelect('review.user', 'user')
        .where('hotelId = :hotelId', { hotelId: hotel.id })
        .getMany();
    });
    const reviewsResults = await Promise.all(fetchReviewsPromises);
    const reviews = reviewsResults
      .flat()
      .filter((review) => review.dateRate)
      .sort((a, b) => {
        const r = new Date(b.dateRate).getTime();
        const q = new Date(a.dateRate).getTime();
        return r - q;
      });
    return { status: 'success', data: reviews };
  }
  async checkCanReview(body: { hotelId: number; userId: number }) {
    const review = await this.reviewRepository
      .createQueryBuilder('review')
      .where('hotelId = :hotelId', { hotelId: body.hotelId })
      .andWhere('review.userId = :userId', { userId: body.userId })
      .getOne();
    if (!review) return true;
    return false;
  }
  async updateReviews(files: Array<Express.Multer.File>, body: ReviewBodyDto) {
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
    const review = await this.reviewRepository.findOne({
      where: { hotelId: Number(body.hotelId), userId: body.userId },
    });
    if (!review) {
      throw new HttpException('Review not found!!', HttpStatus.BAD_REQUEST);
    }
    review.rating = body.rating;
    review.summary = body.summary;
    review.imageUrls = imageUrls;
    const result = await this.reviewRepository.save(review);
    await this.updateHotel(body.hotelId);
    return result;
  }
  async updateHotel(hotelId: number) {
    const allReviews = await this.reviewRepository.find({
      where: { hotelId: Number(hotelId) },
    });
    const totalReviews = allReviews.length;
    const totalRatings = allReviews.reduce(
      (acc, review) => acc + review.rating,
      0,
    );
    const newOverallRating = totalRatings / totalReviews;
    const hotel = await this.hotelRepository.findOne({
      where: { id: Number(hotelId) },
    });
    if (!hotel) {
      throw new Error('Hotel not found');
    }
    hotel.rating = newOverallRating;
    hotel.numberOfRating = totalReviews;
    let one = 0;
    let two = 0;
    let three = 0;
    let four = 0;
    let five = 0;
    allReviews.forEach((review) => {
      if (review.rating <= 5 && review.rating > 4) {
        five++;
      }
      if (review.rating <= 4 && review.rating > 3) {
        four++;
      }
      if (review.rating <= 3 && review.rating > 2) {
        three++;
      }
      if (review.rating <= 2 && review.rating > 1) {
        two++;
      }
      if (review.rating <= 1 && review.rating >= 0) {
        one++;
      }
    });
    hotel.oneStar = one;
    hotel.twoStar = two;
    hotel.threeStar = three;
    hotel.fourStar = four;
    hotel.fiveStar = five;
    await this.hotelRepository.save(hotel);
  }
  async replyReview(body: { reviewId: number; reply: string }) {
    const review = await this.reviewRepository
      .createQueryBuilder('review')
      .where('id = :reviewId', { reviewId: body.reviewId })
      .getOne();
    if (review) {
      const curDate = new Date();
      review.reply = body.reply;
      review.replyDate = curDate.toString();
    }
    const data = await this.reviewRepository.save(review);
    const result = await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.user', 'user')
      .where('review.id = :reviewId', { reviewId: data.id })
      .getOne();
    return result;
  }
}
