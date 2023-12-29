import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto } from './dto/user.create.dto';
import { BanToggleDto } from './dto/user.banToggle.dto';
import { UserUpdateDto } from './dto/user.update.dto';

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

  @HttpCode(200)
  @Patch('toggleBan/:id')
  async banUser(@Param('id') userId, @Body() banData: BanToggleDto) {
    if (!userId) throw new BadRequestException('id пользователя не указано');
    return await this.usersService.toggleBan(+userId, banData);
  }

  @Put(':id')
  async updateUser(
    @Param('id') userId,
    @Body() updatedUserData: UserUpdateDto,
  ) {
    return await this.usersService.updateUser(+userId, updatedUserData);
  }

  @Patch(':id')
  async partialUpdateUser(
    @Param('id') userId,
    @Body() updatedUserData: Partial<UserUpdateDto>,
  ) {
    return await this.usersService.partialUpdateUser(+userId, updatedUserData);
  }
}
