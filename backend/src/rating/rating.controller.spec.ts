import { Test, TestingModule } from '@nestjs/testing';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { PrismaService } from 'src/prisma.service';
import { PostService } from 'src/post/post.service';
import { FileService } from 'src/file/file.service';
import { UsersService } from 'src/users/users.service';
import { RoleService } from 'src/role/role.service';



describe('RatingController', () => {
  let controller: RatingController;
  let service: RatingService;
  let prismaService: PrismaService;
  let postService: PostService;
  let fileService: FileService; 
  let usersService: UsersService;
  let roleService: RoleService;  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatingController],
      providers: [RatingService, PrismaService, PostService, FileService, UsersService, RoleService], // Добавьте ваши сервисы в провайдеры
    }).compile();

    controller = module.get<RatingController>(RatingController);
    service = module.get<RatingService>(RatingService);
    prismaService = module.get<PrismaService>(PrismaService);
    postService = module.get<PostService>(PostService);
    fileService = module.get<FileService>(FileService); 
    usersService = module.get<UsersService>(UsersService);
    roleService = module.get<RoleService>(RoleService);
  });

  describe('getRate', () => {
    it('get rate 5.0', async () => {
      jest.spyOn(service, 'getRate').mockResolvedValue(5.0);

      const postId = 1;
      const res = await controller.getRate(postId);

      expect(res).toBe(5.0);
    });
  });
});
