import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma.service';
import { PostService } from 'src/post/post.service';
import { FileService } from 'src/file/file.service';
import { UsersService } from 'src/users/users.service';
import { RoleService } from 'src/role/role.service';
import { PostController } from './post.controller';
import { RatingService } from 'src/rating/rating.service';

const dataTest = {
    "postId": 1,
    "postName": "София Толстых",
    "banned": false,
    "banReason": null,
    "description": "Пост о Софие Толстых",
    "link": "https://vk.com/princessunlight",
    "postImage": [
        {
            "postImageId": 30,
            "postId": 1,
            "filePath": "8504c9bf-b731-4a65-9052-686a0881ef26.jpg",
            "order": 1
        },
        {
            "postImageId": 31,
            "postId": 1,
            "filePath": "3d9764c5-073d-4b18-b52c-27d4fa9c51cb.jpg",
            "order": 2
        }
    ],
    "categories": [
        {
            "categoryId": 1,
            "categoryName": "Одногруппники"
        },
        {
            "categoryId": 2,
            "categoryName": "Девушки"
        },
        {
            "categoryId": 3,
            "categoryName": "Красивые"
        },
        {
            "categoryId": 4,
            "categoryName": "Эстетичное"
        }
    ],
    "user": {
        "userId": 7,
        "nickname": "Ch1ChaGL",
        "firstName": null,
        "lastName": null,
        "email": "markov.danil.04@mail.ru",
        "banned": false,
        "banReason": null,
        "roles": [
            "admin",
            "user"
        ],
        "socialNetwork": [
            {
                "link": "https://t.me/Ch1Cha_GL",
                "socialNetworkId": 1,
                "socialNetworkName": "Telegram",
                "iconPath": "759ea4e7-5c49-462f-92f8-c52be2853070.svg"
            },
            {
                "link": "https://vk.com/ch1cha_gl",
                "socialNetworkId": 2,
                "socialNetworkName": "VK",
                "iconPath": "d0fc61a7-c3f2-4517-a360-5e9b45c74b0a.svg"
            }
        ]
    },
    "rating": 5
}

describe('PostController', () => {
  let controller: PostController;
  let service: PostService;
  let prismaService: PrismaService;
  let postService: PostService;
  let fileService: FileService; 
  let usersService: UsersService;
  let roleService: RoleService;  
  let ratingService: RatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostService, PrismaService, PostService, FileService, UsersService, RoleService, RatingService], // Добавьте ваши сервисы в провайдеры
    }).compile();

    controller = module.get<PostController>(PostController);
    service = module.get<PostService>(PostService);
    prismaService = module.get<PrismaService>(PrismaService);
    postService = module.get<PostService>(PostService);
    fileService = module.get<FileService>(FileService); 
    usersService = module.get<UsersService>(UsersService);
    roleService = module.get<RoleService>(RoleService);
    ratingService = module.get<RatingService>(RatingService);
  });

  describe('getPostById', () => {
    it('get post by id', async () => {
      jest.spyOn(service, 'getPostById').mockResolvedValue(dataTest);

      const postId = 1;
      const res = await controller.getPostById(postId);
      const nickname = "Ch1ChaGL"  

      expect(res.user.nickname).toBe(nickname);
    });
  });
});
