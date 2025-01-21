import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Part } from './entities/part.entity';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { Category } from 'src/categories/entities/category.entity';
import * as path from 'path';  // path modulini butunlay import qilamiz
import * as fs from 'fs';      // fs modulini butunlay import qilamiz
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
      where: { sku: createPartDto.sku },
    });
    if (existingPart) {
      throw new BadRequestException(`"${createPartDto.sku}" SKU allaqachon ro'yxatdan o'tgan!`);
    }
  
    try {
      // Kategoriyalarni ID lariga ko'ra topish
      const categories = createPartDto.categories
        ? await this.categoriesRepository.findByIds(createPartDto.categories)
        : [];
  
      // Agar kategoriyalar bo'lmasa, foydalanuvchiga xatolik yuborish
      if (!categories || categories.length === 0) {
        throw new NotFoundException('Bunday kategoriya mavjud emas!');
      }
  
      // Yangi partni yaratish
      const part = this.partsRepository.create({
        ...createPartDto,
        categories,
      });
  
      // Yangi partni saqlash
      return await this.partsRepository.save(part);
    } catch (error) {
      console.error('Mahsulot qo‘shishda xatolik:', error);
      if (error instanceof NotFoundException) {
        // Foydalanuvchiga aniq xabar yuborish
        throw new NotFoundException('Kategoriyalar mavjud emas yoki topilmadi. Iltimos, to\'g\'ri kategoriyalarni kiriting.');
      }
      throw new InternalServerErrorException('Yangi mahsulotni qo‘shishda xatolik yuz berdi!');
    }
  }
  

  async findAll() {
    const parts = await this.partsRepository.find({ relations: ['categories'] });
    if (!parts.length) {
      throw new NotFoundException('Hozircha mahsulotlar mavjud emas!');
    }
    return parts;
  }

  async findOne(id: number) {
    const part = await this.partsRepository.findOne({ where: { id }, relations: ['categories'] });
    if (!part) {
      throw new NotFoundException(`ID ${id} ga ega mahsulot topilmadi!`);
    }
    return part;
  }

  async update(id: number, updatePartDto: UpdatePartDto) {
    // Partni olish, uni kategoriyalar bilan birga yuklash
    const part = await this.partsRepository.findOne({
      where: { id },
      relations: ['categories'], // Kategoriyalarni yuklash
    });

    if (!part) {
      throw new NotFoundException(`ID ${id} ga ega mahsulot topilmadi!`);
    }

    // Kategoriyalarni yangilash
    if (updatePartDto.categories) {
      // Yangi kategoriyalarni ID orqali topish
      const newCategories = await this.categoriesRepository.findByIds(updatePartDto.categories);

      if (!newCategories.length) {
        throw new NotFoundException(`Berilgan ID'lar bo'yicha kategoriyalar topilmadi.`);
      }

      // Kategoriyalarni tekshirish va yangilash
      for (const category of newCategories) {
        // Kategoriya `parts` massiviga ega bo'lishi kerak
        if (!category.parts) {
          category.parts = []; // Agar `category.parts` mavjud bo'lmasa, uni bo'sh massivga o'rnatish
        }

        // Agar part allaqachon kategoriya `parts` massivida bo'lmasa, qo'shish
        if (!category.parts.some(p => p.id === part.id)) {
          category.parts.push(part); // `part`ni `category`ga qo'shish
        } else {
          // Agar `part` allaqachon kategoriya `parts` massivida bo'lsa, uni qayta qo'shmaslik
          throw new NotFoundException(`ID ${part.id} bo'lgan mahsulot allaqachon kategoriya "${category.name}"ga qo'shilgan.`);
        }

        // Categoryni yangilash
        await this.categoriesRepository.save(category);
      }

      // Partni yangi kategoriyalarga ulash
      part.categories = newCategories;
    }

    // Boshqa maydonlarni yangilash
    Object.assign(part, updatePartDto);

    // Partni saqlash
    return await this.partsRepository.save(part);
  }
  
  async remove(id: number) {
    const existingPart = await this.partsRepository.findOne({ where: { id } });
    if (!existingPart) {
      throw new NotFoundException(`ID ${id} ga ega mahsulot topilmadi!`);
    }
    await this.partsRepository.delete(id);
    return { message: `Mahsulot muvaffaqiyatli o‘chirildi!` };
  }

  async getPartsByCategory(categoryId: number) {
    const queryBuilder = this.categoriesRepository.createQueryBuilder('category');
    
    // Kategoriyani ID bo'yicha topish
    const category = await queryBuilder
      .leftJoinAndSelect('category.parts', 'part')  // Kategoriyaga tegishli mahsulotlarni olib kelish
      .where('category.id = :categoryId', { categoryId })
      .getOne();
  
    if (!category) {
      throw new NotFoundException(`Bunday kategoriya topilmadi!`);
    }
  
    // Agar kategoriya mavjud bo'lsa, mahsulotlarni qaytarish
    return category.parts;  // Categoryga tegishli bo'lgan barcha mahsulotlar
  }
  

  async getAllOem() {
    const distinctOems = await this.partsRepository
      .createQueryBuilder('part')
      .select('DISTINCT part.oem')
      .getRawMany();

    return distinctOems.map(oem => oem.oem);
  }

  async getOemId(oem: string) {
    const trts = await this.partsRepository
      .createQueryBuilder('part')
      .select('DISTINCT part.trtCode')
      .where('part.oem = :oem', { oem })
      .getRawMany();
    return trts.map(trt => trt.trtCode);
  }

  async getTrtCode(trt: string) {
    const brands = await this.partsRepository
      .createQueryBuilder('part')
      .select('DISTINCT part.brand')
      .where('part.trtCode = :trt', { trt })
      .getRawMany();
    return brands.map(brand => brand.brand);
  }

  async getBrand(brand: string) {
    const models = await this.partsRepository
      .createQueryBuilder('part')
      .select('DISTINCT part.model')
      .where('part.brand = :brand', { brand })
      .getRawMany();
    return models.map(model => model.model);
  }

  async search(oem: string, trt: string, brand: string, model: string) {
    const queryBuilder = this.partsRepository.createQueryBuilder('part');

    if (oem) queryBuilder.andWhere('LOWER(part.oem) = LOWER(:oem)', { oem: oem.toLowerCase() });
    if (trt) queryBuilder.andWhere('LOWER(part.trtCode) = LOWER(:trt)', { trt: trt.toLowerCase() });
    if (brand) queryBuilder.andWhere('LOWER(part.brand) = LOWER(:brand)', { brand: brand.toLowerCase() });
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
  
  

  async searchByName(name: string) {
    const parts = await this.partsRepository
      .createQueryBuilder('part')
      .where('LOWER(part.name) LIKE LOWER(:name)', { name: `%${name.toLowerCase()}%` })
      .getMany();

    if (parts.length === 0) {
      throw new NotFoundException(`"${name}" nomi bo‘yicha mahsulot topilmadi!`);
    }

    return parts;
  }

  async getTotalCount() {
    const totalCount = await this.partsRepository.count();
    return { total: totalCount };
  }

  getImagePath(imageName: string): string | null {
    if (!imageName) {
      return null;
    }
    const imagePath = path.join(__dirname, '..', '..', 'uploads', imageName);
    if (fs.existsSync(imagePath)) {
      return imagePath;
    } else {
      return null;
    }
  }

  
  
}
