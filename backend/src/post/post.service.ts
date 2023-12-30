import { Injectable } from '@nestjs/common';
import { PostCreateDto } from './dto/post.create.dto';
import { PrismaService } from 'src/prisma.service';
import { FileService } from 'src/file/file.service';
import { FormatFile } from 'src/const/formatFile.const';

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private fileService: FileService,
  ) {}

  async createPost(
    dto: PostCreateDto,
    userIdn: number,
    images: any[],
  ): Promise<PostCreateDto> {
    const { categoryIds, userId, ...createPostData } = dto;

    const createdPost = await this.prisma.post.create({
      data: { ...createPostData },
    });

    await this.prisma.userPost.create({
      data: {
        postId: createdPost.postId,
        userId: userId,
      },
    });

    Promise.all(
      categoryIds.map(categoryId =>
        this.prisma.categoryPost.create({
          data: {
            postId: createdPost.postId,
            categoryId: categoryId,
          },
        }),
      ),
    );

    images.forEach(async (image, index) => {
      const fileName = await this.fileService.createFile(image, FormatFile.JPG);
      await this.prisma.postImage.create({
        data: {
          order: index + 1,
          filePath: fileName,
          postId: createdPost.postId,
        },
      });
    });

    return this.getPostById(createdPost.postId);
  }

  async getPostById(postId: number): Promise<PostCreateDto> {
    const userPost = await this.prisma.userPost.findFirst({
      where: { postId: postId },
    });

    return await this.prisma.post
      .findFirst({
        where: {
          postId: postId,
        },
        include: {
          categoryPost: {
            select: {
              categoryId: true,
            },
          },
          postImage: true,
        },
      })
      .then(post => {
        const { categoryPost, ...rest } = post;

        return {
          ...rest,
          categoryIds: post.categoryPost.map(category => category.categoryId),
          userId: userPost.userId,
        };
      });
  }
}
