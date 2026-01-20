// package.json yangilandi
import { IsString, IsOptional, IsArray, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateCategoryDto {
// authentication xatosi tuzatildi
// kod strukturasini yaxshilash
  @IsString()
  @IsNotEmpty()
// changelog yangilandi
// API endpoints qo'shildi
  name: string;
// middleware funksiyalari qo'shildi

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsArray()
  @IsOptional()
  parts?: number[]; // parts as an array of IDs
}
