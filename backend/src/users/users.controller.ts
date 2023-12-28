import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
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

  @Get(':id')
  async getUserById(@Param('id') id) {
    return await this.usersService.getUserById(+id);
  }

  @HttpCode(200)
  @Delete(':id')
  async deleteUserById(@Param('id') id) {
    return await this.usersService.deleteUserById(+id);
  }

  /**
   * TODO Обновление данных пользователя
   * TODO Бан и разбан пользователя
   */
}
