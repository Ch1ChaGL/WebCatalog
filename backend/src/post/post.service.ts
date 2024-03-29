import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreatedPost, PostCreateDto } from './dto/post.create.dto';
import { PrismaService } from 'src/prisma.service';
import { FileService } from 'src/file/file.service';
import { FormatFile } from 'src/const/formatFile.const';
import { BanToggleDto } from './dto/post.banToggle.dto';
import { PostUpdateDto } from './dto/post.update.dto';
import { UsersService } from 'src/users/users.service';
import { RatingService } from 'src/rating/rating.service';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private fileService: FileService,
    private userService: UsersService,
    @Inject(forwardRef(() => RatingService))
    private ratingService: RatingService,
  ) {}

  async createPost(
    dto: PostCreateDto,
    userIdn: number,
    images: any[],
  ): Promise<CreatedPost> {
    const { categoryIds, userId, ...createPostData } = dto;

    const createdPost = await this.prisma.post.create({
      data: { ...createPostData },
    });

    await this.prisma.userPost.create({
      data: {
        postId: createdPost.postId,
        userId: Number(userId),
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

    const post = await this.getPostById(createdPost.postId);
    return {
      ...post,
      user: await this.userService.getUserById(userId),
      rating: 0,
    };
  }

  async getPostById(postId: number): Promise<CreatedPost> {
    const userPost = await this.prisma.userPost.findFirst({
      where: {
        postId,
      },
    });

    if (!userPost)
      throw new BadRequestException('Поста с таким id не существует');

    const post = await this.prisma.post.findFirst({
      where: {
        postId: postId,
      },
      include: {
        categoryPost: {
          select: {
            categoryId: true,
            Category: {
              select: {
                categoryName: true,
              },
            },
          },
        },
        postImage: true,
      },
    });
    const { categoryPost, ...rest } = post;

    const user = await this.userService.getUserById(userPost.userId);

    let categories = post.categoryPost.map(category => ({
      categoryId: category.categoryId,
      categoryName: category.Category.categoryName,
    }));

    categories = categories.sort((a, b) => a.categoryId - b.categoryId);
    const rating = await this.ratingService.getRate(post.postId);

    return {
      ...rest,
      categories,
      user,
      rating,
    };
  }

  async getAllPosts(paginationDto: PaginationDto, postSearch: string) {
    try {
      const { page, limit } = paginationDto;

      postSearch = postSearch.trim().toLowerCase();

      const skip = (+page - 1) * +limit;

      const posts = await this.prisma.post.findMany({
        include: {
          categoryPost: {
            select: {
              categoryId: true,
              Category: {
                select: {
                  categoryName: true,
                },
              },
            },
          },
          postImage: true,
        },
        orderBy: { created_at: 'desc' },
        skip,
        take: +limit,
        where: {
          OR: [
            {
              postName: {
                contains: postSearch,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: postSearch,
                mode: 'insensitive',
              },
            },
          ],
        },
      });

      const mPosts = await this.prisma.post.findMany({
        where: {
          OR: [
            {
              postName: {
                contains: postSearch,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: postSearch,
                mode: 'insensitive',
              },
            },
          ],
        },
      });

      let totalPosts =
        postSearch !== '' ? mPosts.length : await this.prisma.post.count();

      const formattedPosts = await Promise.all(
        posts.map(async post => {
          const { categoryPost, ...rest } = post;

          const userPost = await this.prisma.userPost.findFirst({
            where: { postId: rest.postId },
          });

          const user = await this.userService.getUserById(userPost.userId);

          let categories = post.categoryPost.map(category => ({
            categoryId: category.categoryId,
            categoryName: category.Category.categoryName,
          }));

          categories = categories.sort((a, b) => a.categoryId - b.categoryId);
          const rating = await this.ratingService.getRate(post.postId);

          return {
            ...rest,
            categories,
            user,
            rating,
          };
        }),
      );

      return {
        currentPage: +page,
        totalPosts,
        totalPages: Math.ceil(totalPosts / +limit),
        posts: formattedPosts,
      };
    } catch (error) {
      console.error('Error fetching posts:', error);
      return null;
    }
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

    return await this.getPostById(postId);
  }

  async getPostByUserId(userId: string): Promise<CreatedPost[] | null> {
    try {
      const posts = await this.prisma.post.findMany({
        where: {
          userPost: {
            some: {
              userId: Number(userId),
            },
          },
        },
        include: {
          categoryPost: {
            select: {
              categoryId: true,
              Category: {
                select: {
                  categoryName: true,
                },
              },
            },
          },
          postImage: true,
        },
        orderBy: { created_at: 'desc' },
      });

      const formattedPosts = await Promise.all(
        posts.map(async post => {
          const { categoryPost, ...rest } = post;

          const userPost = await this.prisma.userPost.findFirst({
            where: { postId: rest.postId },
          });

          const user = await this.userService.getUserById(userPost.userId);

          let categories = post.categoryPost.map(category => ({
            categoryId: category.categoryId,
            categoryName: category.Category.categoryName,
          }));

          categories = categories.sort((a, b) => a.categoryId - b.categoryId);
          const rating = await this.ratingService.getRate(post.postId);

          return {
            ...rest,
            categories,
            user,
            rating,
          };
        }),
      );

      return formattedPosts;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return null;
    }
  }

  async deletePost(postId: string) {
    const images = await this.prisma.postImage.findMany({
      where: {
        postId: +postId,
      },
    });

    Promise.all(
      images.map(image => this.fileService.deleteFile(image.filePath)),
    );

    return await this.prisma.post.deleteMany({
      where: {
        postId: +postId,
      },
    });
  }
}
