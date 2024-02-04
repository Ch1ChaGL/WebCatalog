import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryCreateDto } from './dto/category.create.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @HttpCode(200)
  @Post('create')
  async createCategory(@Body() createDto: CategoryCreateDto) {
    return await this.categoryService.createCategory(createDto);
  }

  @Get('')
  async getCategory(){
    return await this.categoryService.getAll();
  }
}
