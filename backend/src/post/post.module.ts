import { Module, forwardRef } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'src/prisma.service';
import { FileModule } from 'src/file/file.module';
import { UsersModule } from 'src/users/users.module';
import { RatingModule } from 'src/rating/rating.module';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService],
  imports: [forwardRef(() => RatingModule), FileModule, UsersModule],
  exports: [PostService],
})
export class PostModule {}
