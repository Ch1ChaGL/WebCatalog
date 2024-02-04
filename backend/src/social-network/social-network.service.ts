import { BadRequestException, Injectable } from '@nestjs/common';
import { SocialNetwork, UserSocialNetwork } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CreateSocialNetworkDto } from './dto/social-network.create.dto';
import { FileService } from 'src/file/file.service';
import { FormatFile } from 'src/const/formatFile.const';

type UserSocial = {
  name: string;
  link: string;
};

@Injectable()
export class SocialNetworkService {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService,
    private fileService: FileService,
  ) {}

  async getUserSocialNetwork(userId: number): Promise<UserSocial[] | null> {
    const userSocialNetwork = await this.prisma.userSocialNetwork.findMany({
      where: {
        userId: userId,
      },
      include: {
        SocialNetwork: true,
      },
    });

    const result: UserSocial[] = userSocialNetwork.map(network => ({
      name: network.SocialNetwork.socialNetworkName,
      link: network.link,
    }));

    return result;
  }

  async updateUserSocialNetwork(
    userId: number,
    socialNetworkId: number,
    newLink: string,
  ): Promise<Boolean> {
    const existingRecord = await this.prisma.userSocialNetwork.findUnique({
      where: {
        userId_socialNetworkId: {
          userId: userId,
          socialNetworkId: socialNetworkId,
        },
      },
    });

    if (!existingRecord)
      throw new BadRequestException('У пользователя нет такой социальной сети');

    await this.prisma.userSocialNetwork.update({
      where: {
        userId_socialNetworkId: {
          userId: userId,
          socialNetworkId: socialNetworkId,
        },
      },
      data: {
        link: newLink,
      },
    });

    return true;
  }

  async addSocialNetwork(
    userId: number,
    socialNetworkId: number,
    link: string,
  ): Promise<UserSocialNetwork> {
    console.log(socialNetworkId);
    const existSocialNetwork = await this.getSocialNetwork(socialNetworkId);

    if (!existSocialNetwork)
      throw new BadRequestException('Такой социальной сети не существует');

    const addedSocialNetwork = await this.prisma.userSocialNetwork.create({
      data: {
        socialNetworkId: socialNetworkId,
        userId: userId,
        link: link,
      },
    });

    return addedSocialNetwork;
  }

  async getSocialNetwork(socialNetworId: number): Promise<SocialNetwork> {
    return await this.prisma.socialNetwork.findUnique({
      where: {
        socialNetworkId: socialNetworId,
      },
    });
  }

  async getAllSocialNetwork(): Promise<SocialNetwork[]> {
    return await this.prisma.socialNetwork.findMany();
  }
  async createSocialNetwork(
    socialNetwork: CreateSocialNetworkDto,
    icon: any,
  ): Promise<CreateSocialNetworkDto> | null {
    const createdSocialNetwork = await this.prisma.socialNetwork.create({
      data: {
        socialNetworkName: socialNetwork.socialNetworkName,
        iconPath: await this.fileService.createFile(icon, FormatFile.SVG),
      },
    });

    return createdSocialNetwork;
  }

  async updateUserSocialNetworks(data: any) {
    const { userId, ...socialNetworkData } = data;

    const { socialNetwork } = await this.userService.getUserById(userId);

    for (const socialNetworkId in socialNetworkData) {
      const link = socialNetworkData[socialNetworkId];

      const index = socialNetwork.findIndex(
        sn => String(sn.socialNetworkId) === socialNetworkId,
      );

      if (index === -1) {
        await this.addSocialNetwork(userId, Number(socialNetworkId), link);
      }

      await this.updateUserSocialNetwork(userId, Number(socialNetworkId), link);
    }

    return true;
  }
}
