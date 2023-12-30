import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategoryCreateDto } from './dto/category.create.dto';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(
    createCategoryDto: CategoryCreateDto,
  ): Promise<Category> {
    const createdCategory = await this.prisma.category.create({
      data: {
        categoryName: createCategoryDto.categoryName,
      },
    });

    return createdCategory;
  }
}
