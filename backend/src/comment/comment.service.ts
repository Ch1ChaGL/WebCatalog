import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CommentDto } from './dto/comment.addComment.dto';
import { PostService } from 'src/post/post.service';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentService {
  constructor(
    private prisma: PrismaService,
    private postService: PostService,
  ) {}

  async addComment(dto: CommentDto): Promise<Comment> {
    await this.postService.getPostById(dto.postId);

    return await this.prisma.comment.create({
      data: {
        ...dto,
      },
    });
  }

  async getComments(postId: number): Promise<Comment[]> {
    await this.postService.getPostById(postId);
    return await this.prisma.comment.findMany({
      where: {
        postId: postId,
      },
    });
  }
}
