import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Part } from '../parts/entities/part.entity';
import { CategoryService } from './categories.service';
import { CategoryController } from './categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Part])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoriesModule {}
