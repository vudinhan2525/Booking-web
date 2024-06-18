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
import { HotelBody, HotelUpdateBody } from 'src/dtos/hotel/hotel.dto';
import { IFilterHotel } from 'src/interfaces/filterObj';
import { HotelService } from 'src/services/hotel.service';

@Controller('hotel')
export class HotelController {
  constructor(private hotelService: HotelService) {}
  @Post('addHotel')
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      fileFilter(req, file, callback) {
        if (file.mimetype.match(/\/(jpg|webp|jpeg|png|gif)$/)) {
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
  async createHotel(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() data: HotelBody,
    @Res() res: Response,
  ) {
    const result = await this.hotelService.createHotel(
      files,
      data,
      res.locals.user.id,
    );
    res.status(200).json(result);
  }
  @Post('updateHotel')
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      fileFilter(req, file, callback) {
        if (file.mimetype.match(/\/(jpg|webp|jpeg|png|gif)$/)) {
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
  async updateHotel(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() data: HotelUpdateBody,
    @Res() res: Response,
  ) {
    const result = await this.hotelService.updateHotel(files, data);
    res.status(200).json(result);
  }
  @Post('getHotels')
  async getHotel(
    @Body() data: { long: number; lat: number; filter: IFilterHotel },
    @Res() res: Response,
  ) {
    const result = await this.hotelService.getHotel(data);
    res.status(200).json({ status: 'success', data: result });
  }
  @Post('getOneHotel')
  async getOneHotel(@Body() data, @Res() res: Response) {
    const result = await this.hotelService.getOneHotel(data.hotelId);
    res.status(200).json(result);
  }
  @Post('importHotel')
  async importHotel(@Body() body: HotelBody[], @Res() res: Response) {
    this.hotelService.importHotel(body);
    res.status(200).json({ status: 'success' });
  }
  @Post('getHotelFromAdmin')
  async getHotelFromAdmin(
    @Body() body: { adminId: number; accomodation: string; searchText: string },
    @Res() res: Response,
  ) {
    const result = await this.hotelService.getHotelFromAdmin(body);
    res.status(200).json({ status: 'success', data: result });
  }
}
