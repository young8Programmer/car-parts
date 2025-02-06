import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Part } from './entities/part.entity';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { Category } from 'src/categories/entities/category.entity';
import * as path from 'path';
import * as fs from 'fs';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path/posix';

@Injectable()
export class PartsService {
  constructor(
    @InjectRepository(Part)
    private readonly partsRepository: Repository<Part>,

    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {
    const uploadDir = join(__dirname, '..', 'uploads');
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir);
    }
  }

  async handleFileUpload(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Rasm yuklanmadi!');
    }
    const fileUrl = `https://car-parts-1.onrender.com/products/uploads/${file.filename}`;
    return { message: 'Rasm muvaffaqiyatli yuklandi!', fileUrl };
  }

  async create(createPartDto: CreatePartDto) {
    const existingPart = await this.partsRepository.findOne({
      where: { trtCode: createPartDto.trtCode },
    });

    if (existingPart) {
      throw new BadRequestException(`"${createPartDto.trtCode}" trtCode allaqachon mavjud!`);
    }

    try {
      const categories = createPartDto.categories
        ? await this.categoriesRepository.findByIds(createPartDto.categories)
        : [];

      if (!categories || categories.length === 0) {
        throw new NotFoundException('Bunday kategoriya mavjud emas!');
      }

      // Yangi partni yaratish, brand va oem array sifatida kiritiladi
      const part = this.partsRepository.create({
        ...createPartDto,
        categories,
      });

      return await this.partsRepository.save(part);
    } catch (error) {
      console.error('Mahsulot qo‘shishda xatolik:', error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Kategoriyalar mavjud emas yoki topilmadi. Iltimos, to\'g\'ri kategoriyalarni kiriting.');
      }
      throw new InternalServerErrorException('Yangi mahsulotni qo‘shishda xatolik yuz berdi!');
    }
  }

  async update(id: number, updatePartDto: UpdatePartDto) {
    const part = await this.partsRepository.findOne({
      where: { id },
      relations: ['categories'],
    });

    if (!part) {
      throw new NotFoundException(`ID ${id} ga ega mahsulot topilmadi!`);
    }

    // Brand va oem array sifatida qayta ishlanadi
    part.sku = updatePartDto.sku || part.sku;
    part.name = updatePartDto.name || part.name;
    part.visibilityInCatalog = updatePartDto.visibilityInCatalog || part.visibilityInCatalog;
    part.language = updatePartDto.language || part.language;
    part.translationGroup = updatePartDto.translationGroup || part.translationGroup;
    part.shortDescription = updatePartDto.shortDescription || part.shortDescription;
    part.description = updatePartDto.description || part.description;
    part.inStock = updatePartDto.inStock ?? part.inStock;
    part.images = updatePartDto.images &&  Array.isArray(updatePartDto.images) ? updatePartDto.images : part.images;
    part.carName = updatePartDto.carName || part.carName;
    part.model = updatePartDto.model || part.model;
    part.oem = updatePartDto.oem && Array.isArray(updatePartDto.oem) ? updatePartDto.oem : part.oem;
    part.years = updatePartDto.years || part.years;
    part.price = updatePartDto.price ?? part.price;
    part.imageUrl = updatePartDto.imageUrl || part.imageUrl;
    part.trtCode = updatePartDto.trtCode || part.trtCode;
    part.brand = updatePartDto.brand && Array.isArray(updatePartDto.brand) ? updatePartDto.brand : part.brand; // brand array

    if (updatePartDto.categories) {
      part.categories = await this.categoriesRepository.findByIds(updatePartDto.categories);
    }

    return await this.partsRepository.save(part);
  }

  async getPartsByCategory(categoryId: number) {
    const queryBuilder = this.categoriesRepository.createQueryBuilder('category');
    const category = await queryBuilder
      .leftJoinAndSelect('category.parts', 'part')
      .where('category.id = :categoryId', { categoryId })
      .getOne();

    if (!category) {
      throw new NotFoundException(`Bunday kategoriya topilmadi!`);
    }

    return {
      category,
      parts: category.parts,
    };
  }

  async search(oem: string[], trt: string, brand: string[], model: string) {
    const queryBuilder = this.partsRepository.createQueryBuilder('part');

    if (oem && oem.length > 0) queryBuilder.andWhere('LOWER(part.oem) IN (:...oem)', { oem: oem.map(item => item.toLowerCase()) });
    if (trt) queryBuilder.andWhere('LOWER(part.trtCode) = LOWER(:trt)', { trt: trt.toLowerCase() });
    if (brand && brand.length > 0) queryBuilder.andWhere('LOWER(part.brand) IN (:...brand)', { brand: brand.map(item => item.toLowerCase()) });
    if (model) queryBuilder.andWhere('LOWER(part.model) = LOWER(:model)', { model: model.toLowerCase() });

    const parts = await queryBuilder.getMany();
    return parts;
  }

  async getCategories() {
    const categories = await this.categoriesRepository.find();
    if (categories.length === 0) {
      throw new Error('No categories found!');
    }
    return categories.sort((a, b) => a.id - b.id);
  }

  async getAllOem() {
    const distinctOems = await this.partsRepository
      .createQueryBuilder('part')
      .select('DISTINCT part.oem')
      .getRawMany();

    return distinctOems.map(oem => oem.oem);
  }

  async getBrand(brand: string[]) {
    const models = await this.partsRepository
      .createQueryBuilder('part')
      .select('DISTINCT part.model')
      .where('part.brand IN (:...brand)', { brand })
      .getRawMany();
    return models.map(model => model.model);
  }
}
