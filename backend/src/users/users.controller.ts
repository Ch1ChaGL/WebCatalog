import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto } from './dto/user.create.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  @HttpCode(200)
  async createUser(@Body() dto: UserCreateDto) {
    return await this.usersService.createUser(dto);
  }

  @Get('')
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }
}
