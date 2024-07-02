import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/user-login.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.loginOrRegister(loginUserDto);
  }
}
