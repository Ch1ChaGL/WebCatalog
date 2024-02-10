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
  Query,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostCreateDto } from './dto/post.create.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/decorators/user.decotators';
import { BanToggleDto } from './dto/post.banToggle.dto';
import { PostUpdateDto } from './dto/post.update.dto';
import { Auth } from 'src/decorators/auth.decorators';
import { PaginationDto } from './dto/pagination.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('create')
  @UseInterceptors(FilesInterceptor('images'))
  async createPost(@Body() dto: PostCreateDto, @UploadedFiles() images: any[]) {
    //Не знаю как передать и файлы и данные вместе, возможно через код это можно сделать, но через postman точно нет
    dto.banned = JSON.parse(dto.banned.toString());
    dto.categoryIds = JSON.parse(dto.categoryIds.toString());
    dto.userId = JSON.parse(dto.userId.toString());

    console.log(dto.postName);
    return await this.postService.createPost(dto, dto.userId, images);
  }

  @Get(':id')
  async getPostById(@Param('id') postId) {
    return await this.postService.getPostById(+postId);
  }

  @Get('')
  async getAllPost(@Query() paginationDto: PaginationDto) {
    return await this.postService.getAllPosts(
      paginationDto,
      paginationDto?.query || '',
    );
  }

  @HttpCode(200)
  @Patch('toggleBan/:id')
  async banPost(@Param('id') postId, @Body() banData: BanToggleDto) {
    if (!postId) throw new BadRequestException('id пользователя не указано');
    return await this.postService.toggleBan(+postId, banData);
  }

  @HttpCode(200)
  @UseInterceptors(FilesInterceptor('images'))
  @Patch('update/:id')
  async updatePost(
    @Param('id') postId,
    @Body() dto: PostUpdateDto,
    @UploadedFiles() images,
  ) {
    dto.categoryIds = JSON.parse(
      dto.categoryIds ? JSON.stringify(dto.categoryIds) : null,
    );

    return await this.postService.updatePost(+postId, dto, images);
  }

  @Get('user-posts/:id')
  async getPostsByUserId(@Param('id') userId: string) {
    return await this.postService.getPostByUserId(userId);
  }

  @Delete('delete/:id')
  async deletePost(@Param('id') postId: string) {
    console.log('delete post', postId);
    return await this.postService.deletePost(postId);
  }
  //TODO удаление поста
}
