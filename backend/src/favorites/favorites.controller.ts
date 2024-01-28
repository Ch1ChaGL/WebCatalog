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
import { FavoritesPost } from './dto/TogleFavoritesPost.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get(':id')
  async getAllPost(@Param('id') userId: string) {
    return await this.favoritesService.getFavoritesPost(Number(userId));
  }

  @HttpCode(200)
  @Post('add')
  async addFavoritePost(@Body() dto: FavoritesPost) {
    return await this.favoritesService.addFavoritesPost(dto);
  }

  @Delete('delete')
  async deleteFavoritePost(@Body() dto: FavoritesPost) {
    return await this.favoritesService.removeFavoritesPost(dto);
  }

  @Post('isFavorites')
  async isFavoritesUserPost(@Body() dto: FavoritesPost) {
    return await this.favoritesService.isFavoritesUserPost(dto);
  }

  @Post('toggleFavorite')
  async toggleFavoritePost(@Body() dto: FavoritesPost){
    return await this.favoritesService.toggleFavoritePost(dto);
  }
}
