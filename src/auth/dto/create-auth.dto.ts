import { IsString, IsEmail, IsOptional } from 'class-validator';

// authentication xatosi tuzatildi
// ESLint qoidalariga moslashtirish
export class CreateUserDto {
// error handling yaxshilandi
  @IsString()
  username: string;

// middleware funksiyalari qo'shildi
// API endpoints qo'shildi
  @IsString()
  password: string;
// type error tuzatildi

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  role?: string;
}
