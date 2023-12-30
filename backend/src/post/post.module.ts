import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'src/prisma.service';
import { FileModule } from 'src/file/file.module';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService],
  imports: [FileModule],
})
export class PostModule {}
