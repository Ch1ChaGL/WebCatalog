import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'src/prisma.service';
import { FileModule } from 'src/file/file.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService],
  imports: [FileModule, UsersModule],
  exports: [PostService],
})
export class PostModule {}
