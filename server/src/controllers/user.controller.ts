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
}
