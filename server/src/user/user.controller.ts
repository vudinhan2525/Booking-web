import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserBodyDto } from './user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get(':id')
  getHello(@Param('id') id: number) {
    return this.userService.getUser(id);
  }
  @Post()
  async createUser(@Body() data: UserBodyDto): Promise<User> {
    const dataTransformed = UserBodyDto.plainToClass(data);
    return await this.userService.createUser(dataTransformed);
  }
}
