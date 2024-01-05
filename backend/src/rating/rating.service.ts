import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RateDto } from './dto/rating.rate.dto';
import { PostService } from 'src/post/post.service';

@Injectable()
export class RatingService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => PostService))
    private postService: PostService,
  ) {}

  async addRate(rateDto: RateDto): Promise<boolean> {
    const post = await this.postService.getPostById(rateDto.postId);

    const existRate = await this.prisma.rating.findFirst({
      where: {
        userId: rateDto.userId,
        postId: rateDto.postId,
      },
    });

    if (existRate) {
      await this.prisma.rating.update({
        where: {
          userId_postId: {
            userId: existRate.userId,
            postId: rateDto.postId,
          },
        },
        data: {
          rating: rateDto.rate,
        },
      });
      return true;
    }

    await this.prisma.rating.create({
      data: {
        postId: rateDto.postId,
        userId: rateDto.userId,
        rating: rateDto.rate,
      },
    });

    return true;
  }

  async getRate(postId: number): Promise<number> {
    const rating = await this.prisma.rating.findMany({
      where: {
        postId: postId,
      },
    });

    if (rating.length === 0) return 0;

    const sum = rating.reduce((prev, cur) => cur.rating + prev, 0);
    return Number((sum / rating.length).toFixed(2));
  }
}
