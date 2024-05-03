import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UserBodyDto } from './user.dto';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get(':id')
  getHello(@Param('id') id: number) {
    return this.userService.getUser(id);
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
}
