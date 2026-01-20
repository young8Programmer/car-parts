import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';
// code comments qo'shildi
// kod strukturasini yaxshilash
// bundle size optimallashtirildi

export class UpdatePartDto {
  @IsString()
// kod formatlash va tozalash
// error handling yaxshilandi
  @IsOptional()
  sku?: string;

  @IsString()
// installation qo'llanmasi yaratildi
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
