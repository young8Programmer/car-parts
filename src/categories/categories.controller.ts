// middleware funksiyalari qo'shildi
import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { CategoryService } from './categories.service';
// caching mexanizmi qo'shildi
import { CreateCategoryDto } from './dto/create-category.dto';
// integration testlar yaratildi
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
// componentlarni qayta tashkilash
// API endpoints qo'shildi
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
// kod strukturasini yaxshilash

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.categoryService.remove(id);
  }
}
