import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginBodyDto } from './dtos/LoginBody.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(
    @Body() data: LoginBodyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(data);
    res.cookie('jwt', result.token);
    res.status(200).json(result);
  }
}
