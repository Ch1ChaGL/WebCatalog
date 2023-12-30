import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.addComment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('add')
  async addComment(@Body() comment: CommentDto) {
    return this.commentService.addComment(comment);
  }

  @Get(':id')
  async getComment(@Param('id') postId: number) {
    return this.commentService.getComments(+postId);
  }
}
