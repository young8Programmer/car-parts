import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Part } from '../parts/entities/part.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Part)
    private readonly partRepository: Repository<Part>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { name, description, imageUrl, parts } = createCategoryDto;

    const existingCategory = await this.categoryRepository.findOne({
      where: { name },
    });

    if (existingCategory) {
      throw new BadRequestException(`"${name}" nomli kategoriya allaqachon mavjud!`);
    }

    try {
      const category = this.categoryRepository.create({
        name,
        description,
        imageUrl,
        parts: parts ? await this.partRepository.findByIds(parts) : [],
      });

      return await this.categoryRepository.save(category);
    } catch (error) {
      console.error('Kategoriya qo‘shishda xatolik:', error);
      throw new InternalServerErrorException('Yangi kategoriyani qo‘shishda xatolik yuz berdi!');
    }
  }

  async findAll() {
    const categories = await this.categoryRepository.find({ relations: ['parts'] });
    if (!categories.length) {
      throw new NotFoundException('Hozircha kategoriyalar mavjud emas!');
    }
    return categories;
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({where: {id}, relations: ["parts"]});
    if (!category) {
      throw new NotFoundException(`ID ${id} ga ega kategoriya topilmadi!`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({where: {id}});
    if (!category) {
      throw new NotFoundException(`ID ${id} ga ega kategoriya topilmadi!`);
    }

    try {
      const { name, description, imageUrl, parts } = updateCategoryDto;
      category.name = name;
      category.description = description;
      category.imageUrl = imageUrl;
      category.parts = parts ? await this.partRepository.findByIds(parts) : category.parts;

      await this.categoryRepository.save(category);
      return { message: 'Kategoriya muvaffaqiyatli yangilandi!', category };
    } catch (error) {
      console.error('Kategoriya yangilashda xatolik:', error);
      throw new InternalServerErrorException('Kategoriya yangilanishida xatolik yuz berdi!');
    }
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({where: {id}});
    if (!category) {
      throw new NotFoundException(`ID ${id} ga ega kategoriya topilmadi!`);
    }

    try {
      await this.categoryRepository.delete(id);
      return { message: 'Kategoriya muvaffaqiyatli o‘chirildi!' };
    } catch (error) {
      console.error('Kategoriya o‘chirishda xatolik:', error);
      throw new InternalServerErrorException('Kategoriya o‘chirishda xatolik yuz berdi!');
    }
  }
}
