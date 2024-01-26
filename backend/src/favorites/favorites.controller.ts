import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { TogleFavoritesPost } from './dto/TogleFavoritesPost.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get(':id')
  async getAllPost(@Param(':id') userId) {
    return await this.favoritesService.getFavoritesPost(userId);
  }

  @HttpCode(200)
  @Post('add')
  async addFavoritePost(@Body() dto: TogleFavoritesPost) {
    return await this.favoritesService.addFavoritesPost(dto);
  }

  @Delete('delete')
  async deleteFavoritePost(@Body() dto: TogleFavoritesPost) {
    return await this.favoritesService.removeFavoritesPost(dto);
  }
}
