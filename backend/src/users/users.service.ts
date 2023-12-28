import { BadRequestException, Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/user.create.dto';
import { RoleUser, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { hash } from 'argon2';

type UserWithoutPassword = Omit<User, 'password'> & {
  roles: string[];
};

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private async getUserRoles(userId: number): Promise<string[]> {
    const userRoles: RoleUser[] = await this.prisma.roleUser.findMany({
      where: {
        userId,
      },
    });

    return userRoles.map(userRole => userRole.roleId);
  }

  async createUser(dto: UserCreateDto): Promise<UserWithoutPassword> | null {
    const { roles, ...userData } = dto;

    const oldUser = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (oldUser)
      new BadRequestException({
        message:
          'Пользователь с таким email уже зарегестрирован. Попробуйте снова, используя другой email',
      });

    const hashedPassword = await hash(userData.password);
    const createdUser: User = await this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });

    if (!roles.length)
      new BadRequestException(
        'Количество ролей пользователя не может равнятся нулю',
      );

    await Promise.all(
      roles.map(role =>
        this.prisma.roleUser.create({
          data: {
            roleId: role,
            userId: createdUser.userId,
          },
        }),
      ),
    );

    return {
      ...createdUser,
      roles: await this.getUserRoles(createdUser.userId),
    };
  }

  async getAllUsers(): Promise<UserWithoutPassword[]> | null {
    const getedUsers = await this.prisma.user.findMany();

    const users = Promise.all(
      getedUsers.map(async user => ({
        ...user,
        roles: await this.getUserRoles(user.userId),
      })),
    );

    return users;
  }
}
