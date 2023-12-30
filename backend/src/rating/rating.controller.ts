import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { RateDto } from './dto/rating.rate.dto';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('rate')
  async addRate(@Body() rateDto: RateDto) {
    return this.ratingService.addRate(rateDto);
  }

  @Get(':id')
  async getRate(@Param('id') postId: number) {
    return this.ratingService.getRate(+postId);
  }
}
