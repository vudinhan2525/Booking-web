import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UserBodyDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('getMe')
  getHello(@Res() response: Response) {
    response
      .status(200)
      .json({ status: 'success', data: response.locals.user });
  }
  @Post()
  async createUser(
    @Body() data: UserBodyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const dataTransformed = UserBodyDto.plainToClass(data);
    const result = await this.userService.createUser(dataTransformed);
    // Set cookie here
    res.cookie('jwt', result.token);
    res.status(200).json(result);
  }
  @Post('forgotPassword')
  async forgotPassword(
    @Body() data: { email: string },
    @Res() response: Response,
  ) {
    const result = await this.userService.forgotPassword(data.email);
    response.status(200).json(result);
  }
  @Post('resetPassword')
  async resetPassword(
    @Body() data: { token: string; password: string; passwordConfirm: string },
    @Res() response: Response,
  ) {
    await this.userService.resetPassword(data);
    response.status(200).json({
      status: 'success',
    });
  }
  @Post('updateUser')
  async updateUser(
    @Body()
    body: { email: string; phone: string; firstName: string; lastName: string },
    @Res() response: Response,
  ) {
    const result = await this.userService.updateUser(body);
    response.status(200).json({
      status: 'success',
      data: result,
    });
  }
  @Post('updatePassword')
  async updatePassword(
    @Body()
    body: { oldPassword: string; newPassword: string; confirmPassword: string },
    @Res() response: Response,
  ) {
    const result = await this.userService.updatePassword(
      body,
      response.locals.user.id,
    );
    response.status(200).json(result);
  }
  @Post('savedHotel')
  async savedHotel(
    @Body()
    body: { hotelId: number },
    @Res() response: Response,
  ) {
    const result = await this.userService.savedHotel(
      body,
      response.locals.user.id,
    );
    response.status(200).json({ status: 'success', data: result });
  }
  @Post('unSavedHotel')
  async unSavedHotel(
    @Body()
    body: { hotelId: number },
    @Res() response: Response,
  ) {
    const result = await this.userService.unSavedHotel(
      body,
      response.locals.user.id,
    );
    response.status(200).json({ status: 'success', data: result });
  }
  @Get('getSavedHotel')
  async getSavedHotel(@Res() response: Response) {
    const result = await this.userService.getSavedHotel(
      response.locals.user.savedHotel,
    );
    response.status(200).json({ status: 'success', data: result });
  }
  @Post('savedFlight')
  async savedFlight(
    @Body()
    body: { flightId: number },
    @Res() response: Response,
  ) {
    const result = await this.userService.savedFlight(
      body,
      response.locals.user.id,
    );
    response.status(200).json({ status: 'success', data: result });
  }
  @Post('unSavedFlight')
  async unSavedFlight(
    @Body()
    body: { flightId: number },
    @Res() response: Response,
  ) {
    const result = await this.userService.unSavedFlight(
      body,
      response.locals.user.id,
    );
    response.status(200).json({ status: 'success', data: result });
  }
  @Get('getSavedFlight')
  async getSavedFlight(@Res() response: Response) {
    const result = await this.userService.getSavedFlight(
      response.locals.user.savedFlight,
    );
    response.status(200).json({ status: 'success', data: result });
  }
}
