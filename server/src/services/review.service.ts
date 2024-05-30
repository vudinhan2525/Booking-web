import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/entities/review.entity';
import uploadToAzureBlobStorage from 'src/utils/azureBlob';
import { ReviewBodyDto } from 'src/dtos/review/review.dto';
@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
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
    const now = new Date();
    const formattedDateTime = now.toISOString().slice(0, 19).replace('T', ' ');
    const review = await this.reviewRepository.create({
      rating: body.rating,
      summary: body.summary,
      hotelId: body.hotelId,
      userId: body.userId,
      dateRate: formattedDateTime,
      imageUrls: JSON.stringify(uploadedUrls),
    });
    const result = await this.reviewRepository.save(review);
    console.log(result);
    return;
  }
}
