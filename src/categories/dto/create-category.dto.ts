import { IsString, IsOptional, IsArray, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

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
