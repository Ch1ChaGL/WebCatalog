import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PrismaService } from 'src/prisma.service';
import { PostModule } from 'src/post/post.module';

@Module({
  controllers: [CommentController],
  providers: [CommentService, PrismaService],
  imports: [PostModule]
})
export class CommentModule {}
