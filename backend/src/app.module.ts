import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RoleModule } from './role/role.module';
import { UsersModule } from './users/users.module';
import { SocialNetworkModule } from './social-network/social-network.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [RoleModule, UsersModule, SocialNetworkModule, FileModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
