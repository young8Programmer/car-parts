import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Part } from './entities/part.entity';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

@Injectable()
export class PartsService {
  constructor(
    @InjectRepository(Part)
    private readonly partsRepository: Repository<Part>,
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
      const part = this.partsRepository.create(createPartDto);
      return await this.partsRepository.save(part);
    } catch (error) {
      console.error('Mahsulot qo‘shishda xatolik:', error);
      throw new InternalServerErrorException('Yangi mahsulotni qo‘shishda xatolik yuz berdi!');
    }
  }

  async findAll() {
    const parts = await this.partsRepository.find();
    if (!parts.length) {
      throw new NotFoundException('Hozircha mahsulotlar mavjud emas!');
    }
    return parts;
  }

  async findOne(id: number) {
    const part = await this.partsRepository.findOne({ where: { id } });
    if (!part) {
      throw new NotFoundException(`ID ${id} ga ega mahsulot topilmadi!`);
    }
    return part;
  }

  async update(id: number, updatePartDto: UpdatePartDto) {
    const existingPart = await this.partsRepository.findOne({ where: { id } });
    if (!existingPart) {
      throw new NotFoundException(`ID ${id} ga ega mahsulot topilmadi!`);
    }

    await this.partsRepository.update(id, updatePartDto);
    return { message: `Mahsulot muvaffaqiyatli yangilandi!`, part: { ...existingPart, ...updatePartDto } };
  }

  async remove(id: number) {
    const existingPart = await this.partsRepository.findOne({ where: { id } });
    if (!existingPart) {
      throw new NotFoundException(`ID ${id} ga ega mahsulot topilmadi!`);
    }
    await this.partsRepository.delete(id);
    return { message: `Mahsulot muvaffaqiyatli o‘chirildi!` };
  }

async getPartsByCategory(category: string) {
  const queryBuilder = this.partsRepository.createQueryBuilder('part');
  
  const parts = await queryBuilder
    .where('LOWER(part.categories) LIKE LOWER(:category)', { category: `%${category}%` })
    .getMany();

  if (parts.length === 0) {
    throw new NotFoundException(`No parts found for the category: ${category}`);
  }

  return parts;
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


    async search(name: string, oem: string, trt: string, brand: string, model: string) {
      const queryBuilder = this.partsRepository.createQueryBuilder('part');
    
      if (name) queryBuilder.andWhere('LOWER(part.name) LIKE LOWER(:name)', { name: `%${name.toLowerCase()}%` });
      if (oem) queryBuilder.andWhere('LOWER(part.oem) = LOWER(:oem)', { oem: oem.toLowerCase() });
      if (trt) queryBuilder.andWhere('LOWER(part.trtCode) = LOWER(:trt)', { trt: trt.toLowerCase() });
      if (brand) queryBuilder.andWhere('LOWER(part.brand) = LOWER(:brand)', { brand: brand.toLowerCase() });
      if (model) queryBuilder.andWhere('LOWER(part.model) = LOWER(:model)', { model: model.toLowerCase() });
    
      const parts = await queryBuilder.getMany();
      return parts;
    }
    
    async getCategories() {
      const categories = await this.partsRepository
        .createQueryBuilder('part')
        .select('DISTINCT part.categories')
        .getRawMany()
    
      if (categories.length === 0) {
        throw new Error('No categories found!')
      }
    
      return categories.map(category => category.categories) // Faqat kategoriya nomlarini qaytaradi
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
  
}
