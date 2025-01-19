import { IsString, IsNumber, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

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

  @IsString()
  @IsOptional()
  categories?: string; 

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
