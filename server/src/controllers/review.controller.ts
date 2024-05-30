import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ReviewService } from 'src/services/review.service';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}
  @Post('addReview')
  async createReview(@Body() data, @Res() res: Response) {
    await this.reviewService.createReview(data);
    res.status(200).json({ status: 'success' });
  }
}
