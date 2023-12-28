import { BadRequestException, Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/user.create.dto';
import { RoleUser, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { hash } from 'argon2';

type UserWithoutPassword = Omit<User, 'password'> & { roles: string[] };

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
      throw new BadRequestException({
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
      throw new BadRequestException(
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

    const { password, ...userWithoutPassword } = createdUser;
    return {
      ...userWithoutPassword,
      roles: await this.getUserRoles(createdUser.userId),
    };
  }

  async getAllUsers(): Promise<UserWithoutPassword[]> | null {
    const getedUsers = await this.prisma.user.findMany();

    const users = Promise.all(
      getedUsers.map(async ({ password, ...user }) => ({
        ...user,
        roles: await this.getUserRoles(user.userId),
      })),
    );

    return users;
  }

  async getUserById(userId: number): Promise<UserWithoutPassword> | null {
    const getedUser = await this.prisma.user.findUnique({
      where: {
        userId: +userId,
      },
    });
    const { password, ...user } = getedUser;

    return { ...user, roles: await this.getUserRoles(user.userId) };
  }

  async deleteUserById(userId: number): Promise<Boolean> {
    const findUser = await this.prisma.user.findFirst({
      where: {
        userId,
      },
    });

    if (!findUser)
      throw new BadRequestException({
        message: 'Пользователя с таким id не существует',
      });

    const deletedUser = await this.prisma.user.delete({
      where: {
        userId,
      },
    });

    return deletedUser ? true : false;
  }
}
