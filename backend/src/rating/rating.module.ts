import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { PostModule } from 'src/post/post.module';

@Module({
  controllers: [RatingController],
  providers: [RatingService, PrismaService],
  imports: [UsersModule, PostModule],
})
export class RatingModule {}
