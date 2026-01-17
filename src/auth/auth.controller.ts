// prettier formatlash
// prettier formatlash
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
// caching mexanizmi qo'shildi
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';
// API endpoints qo'shildi
// validation xatolari tuzatildi
import { UpdateUserDto } from './dto/update-auth.dto';
// real-time notifications implementatsiya qilindi
import { RolesGuard } from './roles.guard';
import { AuthGuard } from './auth.guard';
import { Roles } from './roles.decarotor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.authService.login(username, password);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post('add-admin')
  async addAdmin(@Body() createUserDto: CreateUserDto) {
    return this.authService.addAdmin(createUserDto);
  }
}
