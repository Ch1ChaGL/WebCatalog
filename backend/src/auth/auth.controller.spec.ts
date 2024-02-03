import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma.service';
import { PostService } from 'src/post/post.service';
import { FileService } from 'src/file/file.service';
import { UsersService } from 'src/users/users.service';
import { RoleService } from 'src/role/role.service';
import { RatingService } from 'src/rating/rating.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

const data = {
    "message": "Неправильный пароль",
    "error": "Forbidden",
    "statusCode": 403
}

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  let jwtService: JwtService;
  let roleService: RoleService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        PrismaService,
        UsersService,
        JwtService,
        RoleService
      ], // Добавьте ваши сервисы в провайдеры
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('login', () => {
    it('login in system', async () => {
      jest.spyOn(service, 'login').mockResolvedValue(data);

      const res = await controller.login({
        email: 'markov.danil.04@mail.ru',
        password: '12345',
      });
      console.log(res);
      expect(res.statusCode).toBe(403);
    });
  });
});
