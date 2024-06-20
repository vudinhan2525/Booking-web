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
import { RoomService } from 'src/services/room.service';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}
  @Post('importRoom')
  async importRoom(@Body() body, @Res() res: Response) {
    this.roomService.importRoom(body);
    res.status(200).json({ status: 'success' });
  }
  @Post('createRoom')
  @UseInterceptors(
    FilesInterceptor('files', 3, {
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
  async createRoom(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body,
    @Res() res: Response,
  ) {
    const result = await this.roomService.createRoom(
      files,
      JSON.parse(body.data),
    );
    res.status(200).json(result);
  }
  @Post('updateRoom')
  @UseInterceptors(
    FilesInterceptor('files', 3, {
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
  async updateRoom(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body,
    @Res() res: Response,
  ) {
    const result = await this.roomService.updateRoom(
      files,
      JSON.parse(body.data),
    );
    res.status(200).json(result);
  }
  @Post('deleteRoom')
  async deleteRoom(
    @Body() body: { roomId: number; oldImageUrls: string },
    @Res() res: Response,
  ) {
    const result = await this.roomService.deleteRoom(body);
    res.status(200).json(result);
  }
}
