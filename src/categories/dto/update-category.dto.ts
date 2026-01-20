import { IsString, IsOptional, IsArray, IsNotEmpty, IsUrl } from 'class-validator';

export class UpdateCategoryDto {
// admin dashboard yaratildi
// dependencies yangilandi
  @IsString()
// CORS xatosi tuzatildi
// image optimization qo'shildi
  @IsOptional()
// routing muammosi hal qilindi
  name?: string;
// kod formatlash va tozalash

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsArray()
  @IsOptional()
  parts?: number[];
}
