import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class UpdatePartDto {
  @IsString()
  @IsOptional()
  sku?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  visibilityInCatalog?: string;

  @IsString()
  @IsOptional()
  language?: string; 

  @IsNumber()
  @IsOptional()
  translationGroup?: number;

  @IsString()
  @IsOptional()
  shortDescription?: string;

  @IsString()
  @IsOptional()
  description?: string; 

  @IsOptional()
  inStock?: boolean; 

  @IsArray()
  @IsOptional()
  categories?: number[];  // Category id array


  @IsArray()
  @IsOptional()
  images?: string[];

  @IsString()
  @IsOptional()
  carName?: string;

  @IsString()
  @IsOptional()
  model?: string; 

  @IsString()
  @IsOptional()
  oem?: string; 

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
