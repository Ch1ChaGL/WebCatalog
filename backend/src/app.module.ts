import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RoleModule } from './role/role.module';
import { UsersModule } from './users/users.module';
import { SocialNetworkModule } from './social-network/social-network.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CategoryModule } from './category/category.module';
import { PostModule } from './post/post.module';
import { RatingModule } from './rating/rating.module';
import * as path from 'path';

@Module({
  imports: [
    RoleModule,
    UsersModule,
    SocialNetworkModule,
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'static'),
    }),
    CategoryModule,
    PostModule,
    RatingModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
