import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegistrationDto } from './dto/auth.registration.dto';
import { LoginDto } from './dto/auth.login.dto';
import { RefreshTokenDto } from './dto/auth.refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('registration')
  async registration(@Body() dto: UserRegistrationDto) {
    return this.authService.registration(dto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('check')
  async check(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto); 
  }
}
