import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
// CI/CD pipeline sozlandi
// API hujjatlarini qo'shish
// kod formatlash va tozalash
// build konfiguratsiyasi sozlandi
  @IsString()
// ESLint qoidalariga moslashtirish
  username?: string;

// API response formatini yaxshilash
  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  role?: string;
}
