import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { RoleService } from 'src/role/role.service';
import { RoleModule } from 'src/role/role.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  imports: [RoleModule],
  exports: [UsersService]
})
export class UsersModule {}
