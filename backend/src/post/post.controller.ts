import {
  Body,
  Controller,
  HttpCode,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostCreateDto } from './dto/post.create.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/decorators/user.decotators';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @HttpCode(200)
  @Post('create')
  @UseInterceptors(FilesInterceptor('files'))
  async createPost(@Body() dto: PostCreateDto, @UploadedFiles() files: any[]) {
    //Не знаю как передать и файлы и данные вместе, возможно через код это можно сделать, но через postman точно нет
    dto.banned = JSON.parse(dto.banned.toString());
    dto.categoryIds = JSON.parse(dto.categoryIds.toString());
    dto.userId = JSON.parse(dto.userId.toString());

    return await this.postService.createPost(dto, dto.userId, files);
  }
}
