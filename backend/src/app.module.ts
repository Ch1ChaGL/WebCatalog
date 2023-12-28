import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RoleModule } from './role/role.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [RoleModule, UsersModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
