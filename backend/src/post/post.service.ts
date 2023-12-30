import { BadRequestException, Injectable } from '@nestjs/common';
import { PostCreateDto } from './dto/post.create.dto';
import { PrismaService } from 'src/prisma.service';
import { FileService } from 'src/file/file.service';
import { FormatFile } from 'src/const/formatFile.const';
import { BanToggleDto } from './dto/post.banToggle.dto';
import { PostUpdateDto } from './dto/post.update.dto';

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

    if (!userPost)
      throw new BadRequestException('Поста с таким id не существует');

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

  async getAllPost(): Promise<PostCreateDto[] | null> {
    return await this.prisma.post
      .findMany({
        include: {
          categoryPost: {
            select: {
              categoryId: true,
            },
          },
          postImage: true,
        },
      })
      .then(posts =>
        Promise.all(
          posts.map(async post => {
            const { categoryPost, ...rest } = post;

            const userPost = await this.prisma.userPost.findFirst({
              where: { postId: rest.postId },
            });

            return {
              ...rest,
              categoryIds: post.categoryPost.map(
                category => category.categoryId,
              ),
              userId: userPost.userId,
            };
          }),
        ),
      );
  }

  async toggleBan(postId: number, banData: BanToggleDto): Promise<Boolean> {
    const post = await this.prisma.post.findUnique({
      where: {
        postId: postId,
      },
    });

    if (!post) {
      throw new BadRequestException('Поста с таким id не существует');
    }

    await this.prisma.post.update({
      where: { postId: postId },
      data: {
        banned: banData.banned,
        banReason: banData.reason ? banData.reason : null,
      },
    });

    return true;
  }

  async updatePost(postId: number, dto: PostUpdateDto, images: any[]) {
    const { categoryIds, imagesDelete, ...updatedData } = dto;

    const updatedPost = await this.prisma.post.update({
      where: { postId },
      data: {
        ...updatedData,
      },
    });

    if (categoryIds) {
      await this.prisma.categoryPost.deleteMany({
        where: {
          postId,
        },
      });

      Promise.all(
        categoryIds.map(categoryId =>
          this.prisma.categoryPost.create({
            data: {
              categoryId: categoryId,
              postId: postId,
            },
          }),
        ),
      );
    }

    if (images?.length > 0) {
      const oldImages = await this.prisma.postImage.findMany({
        where: {
          postId,
        },
      });

      oldImages.forEach(
        async oldImage => await this.fileService.deleteFile(oldImage.filePath),
      );

      await this.prisma.postImage.deleteMany({
        where: {
          postId: postId,
        },
      });

      images.forEach(async (image, index) => {
        await this.prisma.postImage.create({
          data: {
            order: index + 1,
            postId: postId,
            filePath: await this.fileService.createFile(image, FormatFile.JPG),
          },
        });
      });
    }
    if (imagesDelete) {
      const oldImages = await this.prisma.postImage.findMany({
        where: {
          postId,
        },
      });

      oldImages.forEach(
        async oldImage => await this.fileService.deleteFile(oldImage.filePath),
      );

      await this.prisma.postImage.deleteMany({
        where: {
          postId: postId,
        },
      });
    }
  }
}
