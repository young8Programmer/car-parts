import { IsString, IsNumber, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { Category } from '../../categories/entities/category.entity';

export class CreatePartDto {
  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  visibilityInCatalog?: string;

  @IsString()
  @IsNotEmpty()
  language: string;

  @IsNumber()
  @IsOptional()
  translationGroup?: number;

  @IsString()
  @IsOptional()
  shortDescription?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  inStock: boolean;

  // Kategoriyalarni faqat id larini qabul qilish
  @IsArray()
  @IsOptional()
  categories: number[];  // Category id array

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsString()
  @IsOptional()
  carName?: string;

  @IsArray()
  @IsOptional()
  model?: string[];

  @IsArray()
  @IsOptional()
  oem?: string[];

  @IsString()
  @IsOptional()
  years?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  trtCode?: string;

  @IsString()
  @IsOptional()
  brand?: string;
}
