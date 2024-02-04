import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SocialNetworkService } from './social-network.service';
import { CreateSocialNetworkDto } from './dto/social-network.create.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('social-network')
export class SocialNetworkController {
  constructor(private readonly socialNetworkService: SocialNetworkService) {}

  @HttpCode(200)
  @Post('create')
  @UseInterceptors(FileInterceptor('icon'))
  async createSocialNetwork(
    @Body() socialNetwork: CreateSocialNetworkDto,
    @UploadedFile() icon,
  ) {
    return await this.socialNetworkService.createSocialNetwork(
      socialNetwork,
      icon,
    );
  }

  @Get('')
  async getAllSocialNetwork() {
    return await this.socialNetworkService.getAllSocialNetwork();
  }

  @Patch('')
  async updateUserSocialNetworks(@Body() data) {
    return await this.socialNetworkService.updateUserSocialNetworks(data);
  }
}
