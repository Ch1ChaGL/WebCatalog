import { Injectable } from '@nestjs/common';
import { RoleUser } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}
  async getUserRoles(userId: number): Promise<RoleUser[]> {
    const userRoles: RoleUser[] = await this.prisma.roleUser.findMany({
      where: {
        userId,
      },
    });
    return userRoles;
  }
}
