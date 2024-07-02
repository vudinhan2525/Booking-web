import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginBodyDto } from '../dtos/authDto/LoginBody.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(@Body() data: LoginBodyDto, @Res() res: Response) {
    const result = await this.authService.login(data);
    res.cookie('jwt', result.token, {
      secure: true,
    });
    res.status(200).json(result);
  }
  @Post('googleAuth')
  async googleAuth(
    @Body()
    body: { firstName: string; lastName: string; email: string; role: string },
    @Res() res: Response,
  ) {
    const result = await this.authService.googleAuth(body);
    if (result.status === 'failed') {
      res.status(200).json(result);
      return;
    }
    res.cookie('jwt', result.token, {
      secure: true,
    });
    res.status(200).json({ status: result.status, data: result.data });
  }
  @Get('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
    return {
      status: 'success',
    };
  }
}
