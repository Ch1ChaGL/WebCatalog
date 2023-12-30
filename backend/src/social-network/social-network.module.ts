import { Module } from '@nestjs/common';
import { SocialNetworkService } from './social-network.service';
import { SocialNetworkController } from './social-network.controller';
import { UsersModule } from 'src/users/users.module';
import { PrismaService } from 'src/prisma.service';
import { FileModule } from 'src/file/file.module';

@Module({
  controllers: [SocialNetworkController],
  providers: [SocialNetworkService, PrismaService],
  imports: [UsersModule, FileModule],
})
export class SocialNetworkModule {}
