import { Injectable } from '@nestjs/common';
import { CreatedPost } from 'src/post/dto/post.create.dto';
import { PostService } from 'src/post/post.service';
import { PrismaService } from 'src/prisma.service';
import { FavoritesPost } from './dto/TogleFavoritesPost.dto';

@Injectable()
export class FavoritesService {
  constructor(
    private prisma: PrismaService,
    private postService: PostService,
  ) {}

  async getFavoritesPost(userId: number): Promise<CreatedPost[]> {
    const favoritesIds = await this.prisma.faworites.findMany({
      where: { userId: userId },
    });

    const favoritesPost = Promise.all(
      favoritesIds.map(value => this.postService.getPostById(value.postId)),
    );

    return favoritesPost;
  }

  async addFavoritesPost(dto: FavoritesPost) {
    await this.prisma.faworites.create({
      data: { postId: dto.postId, userId: dto.userId },
    });
  }

  async removeFavoritesPost(dto: FavoritesPost) {
    await this.prisma.faworites.deleteMany({
      where: { postId: dto.postId, userId: dto.userId },
    });
  }

  async isFavoritesUserPost(dto: FavoritesPost) {
    const post = await this.prisma.faworites.findMany({
      where: {
        postId: dto.postId,
        userId: dto.userId,
      },
    });

    return post.length !== 0;
  }

  async toggleFavoritePost(dto: FavoritesPost) {
    if (await this.isFavoritesUserPost(dto))
      return await this.removeFavoritesPost(dto);
    return await this.addFavoritesPost(dto);
  }
}
