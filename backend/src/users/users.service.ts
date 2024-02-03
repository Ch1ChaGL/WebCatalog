import { BadRequestException, Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/user.create.dto';
import { RoleUser, User, UserSocialNetwork } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { hash } from 'argon2';
import { BanToggleDto } from './dto/user.banToggle.dto';
import { UserUpdateDto } from './dto/user.update.dto';
import { RoleService } from 'src/role/role.service';

export interface UserWithoutPassword extends Omit<User, 'password'> {
  roles: string[];
  socialNetwork: ISocialNetwork[];
}

export interface ISocialNetwork {
  link: string;
  socialNetworkId: number;
  socialNetworkName: string;
  iconPath: string;
}

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private roleService: RoleService,
  ) {}

  async getUserRoles(userId: number): Promise<string[]> {
    const userRoles: RoleUser[] = await this.roleService.getUserRoles(userId);

    return userRoles.map(userRole => userRole.roleId);
  }

  async createUser(dto: UserCreateDto): Promise<UserWithoutPassword> | null {
    const { roles, ...userData } = dto;

    let oldUser = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (oldUser && dto.nickname)
      throw new BadRequestException({
        message:
          'Пользователь с таким email уже зарегестрирован. Попробуйте снова, используя другой email',
      });

    oldUser = await this.prisma.user.findFirst({
      where: {
        nickname: dto.nickname,
      },
    });

    if (oldUser)
      throw new BadRequestException({
        message:
          'Пользователь с таким ником уже зарегестрирован. Попробуйте снова, используя другой никнейм',
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
      socialNetwork: await this.getUserSocialNetwork(createdUser.userId),
    };
  }

  async getAllUsers(): Promise<UserWithoutPassword[]> | null {
    const getedUsers = await this.prisma.user.findMany();

    const users = Promise.all(
      getedUsers.map(async ({ password, ...user }) => ({
        ...user,
        roles: await this.getUserRoles(user.userId),
        socialNetwork: await this.getUserSocialNetwork(user.userId),
      })),
    );

    return users;
  }

  async getUserSocialNetwork(userId: number) {
    const userSocialNetworks = await this.prisma.userSocialNetwork.findMany({
      where: { userId: userId },
      include: { SocialNetwork: true },
    });

    const formattedUserSocialNetworks = userSocialNetworks.map(
      ({ userId, link, SocialNetwork }) => ({
        link,
        ...SocialNetwork,
      }),
    );

    return formattedUserSocialNetworks;
  }
  async getUserById(userId: number): Promise<UserWithoutPassword> | null {
    const getedUser = await this.prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });
    const { password, ...user } = getedUser;

    return {
      ...user,
      roles: await this.getUserRoles(user.userId),
      socialNetwork: await this.getUserSocialNetwork(userId),
    };
  }

  async getUserByIdWithPassword(userId: number) {
    const getedUser = await this.prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });

    return {
      ...getedUser,
      roles: await this.getUserRoles(getedUser.userId),
    };
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

  async toggleBan(userId: number, banData: BanToggleDto): Promise<Boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!user) {
      throw new BadRequestException('пользователя с таким id не существует');
    }

    await this.prisma.user.update({
      where: { userId: userId },
      data: {
        banned: banData.banned,
        banReason: banData.reason ? banData.reason : null,
      },
    });

    return true;
  }

  async updateUser(userId: number, userData: UserUpdateDto): Promise<boolean> {
    const { roles, ...user } = userData;

    await this.prisma.roleUser.deleteMany({
      where: {
        userId: userId,
      },
    });

    Promise.all(
      roles.map(role =>
        this.prisma.roleUser.create({
          data: {
            roleId: role,
            userId: userId,
          },
        }),
      ),
    );

    const hashedPassword = await hash(userData.password);

    const updatedUser = await this.prisma.user.update({
      where: {
        userId: userId,
      },
      data: {
        ...user,
        password: hashedPassword,
      },
    });

    return !!updatedUser;
  }

  async partialUpdateUser(
    userId: number,
    partialUserData: Partial<UserUpdateDto>,
  ) {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!user)
      throw new BadRequestException(`Пользователь с ID ${userId} не найден`);

    if (partialUserData.nickname) {
      const hasUser = await this.prisma.user.findUnique({
        where: { nickname: partialUserData.nickname },
      });

      if (hasUser)
        throw new BadRequestException(
          'Пользователь с таким nickname уже существует',
        );
    }

    const hashedPassword = await hash(partialUserData.password);

    await this.prisma.user.update({
      where: {
        userId: userId,
      },
      data: {
        ...partialUserData,
        password: hashedPassword ? hashedPassword : user.password,
      },
    });

    return await this.getUserById(userId);
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.prisma.user.findFirst({ where: { email: email } });
  }
}
