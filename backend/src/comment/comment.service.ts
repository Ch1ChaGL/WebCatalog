import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CommentDto } from './dto/comment.addComment.dto';
import { PostService } from 'src/post/post.service';
import { Comment } from '@prisma/client';

export interface CommentData extends Comment {
  User: { nickname: string };
}

@Injectable()
export class CommentService {
  constructor(
    private prisma: PrismaService,
    private postService: PostService,
  ) {}

  async addComment(dto: Comment): Promise<Comment> {
    return await this.prisma.comment.create({
      data: {
        commentText: dto.commentText,
        postId: Number(dto.postId),
        userId: dto.userId,
        created_at: new Date(Date.now()),
      },
    });
  }

  async getComments(postId: number): Promise<CommentData[]> {
    await this.postService.getPostById(postId);
    return await this.prisma.comment.findMany({
      where: {
        postId: postId,
      },
      include: {
        User: {
          select: { nickname: true },
        },
      },
    });
  }
}
