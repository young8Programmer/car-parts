// changelog yangilandi
import { Module } from '@nestjs/common';
// environment variables sozlandi
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Part } from '../parts/entities/part.entity';
// prettier formatlash
import { CategoryService } from './categories.service';
import { CategoryController } from './categories.controller';
// integration testlar yaratildi
// error handling yaxshilandi

// authentication xatosi tuzatildi
@Module({
  imports: [TypeOrmModule.forFeature([Category, Part])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoriesModule {}
