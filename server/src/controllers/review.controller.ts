import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { extname } from 'path';
import { ReviewBodyDto } from 'src/dtos/review/review.dto';
import { ReviewService } from 'src/services/review.service';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}
  @Post('addReview')
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      fileFilter(req, file, callback) {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          const fileSize = parseInt(req.headers['content-length']);
          if (fileSize > 1024 * 1024 * 5) {
            callback(
              new HttpException(
                `File size is too large. It must be less than 5MB, your file size is ${(fileSize / (1024 * 1024)).toFixed(1)}MB`,
                HttpStatus.BAD_REQUEST,
              ),
              false,
            );
            return;
          }
          callback(null, true);
        } else {
          callback(
            new HttpException(
              `Unsupported file type ${extname(file.originalname)}`,
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
      },
    }),
  )
  async createReview(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() data: ReviewBodyDto,
    @Res() res: Response,
  ) {
    const result = await this.reviewService.createReview(files, data);
    res.status(200).json({ status: 'success', data: result });
  }
  @Post('getReviews')
  async getReviews(
    @Body() data: { hotelId: number; userId?: number },
    @Res() res: Response,
  ) {
    const result = await this.reviewService.getReviews(data);
    res.status(200).json({ status: 'success', data: result });
  }
  @Post('checkCanReview')
  async checkCanReview(
    @Body() data: { hotelId: number; userId: number },
    @Res() res: Response,
  ) {
    const result = await this.reviewService.checkCanReview(data);
    res.status(200).json({ status: 'success', data: result });
  }
  @Post('updateReview')
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      fileFilter(req, file, callback) {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          const fileSize = parseInt(req.headers['content-length']);
          if (fileSize > 1024 * 1024 * 5) {
            callback(
              new HttpException(
                `File size is too large. It must be less than 5MB, your file size is ${(fileSize / (1024 * 1024)).toFixed(1)}MB`,
                HttpStatus.BAD_REQUEST,
              ),
              false,
            );
            return;
          }
          callback(null, true);
        } else {
          callback(
            new HttpException(
              `Unsupported file type ${extname(file.originalname)}`,
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
      },
    }),
  )
  async updateReview(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() data: ReviewBodyDto,
    @Res() res: Response,
  ) {
    const result = await this.reviewService.updateReviews(files, data);
    res.status(200).json({ status: 'success', data: result });
  }
}
