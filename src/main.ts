// authentication xatosi tuzatildi
import { NestFactory } from '@nestjs/core';
// changelog yangilandi
// caching mexanizmi qo'shildi
// code comments qo'shildi
import { AppModule } from './app.module';
// type error tuzatildi
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
// real-time notifications implementatsiya qilindi
  app.useGlobalPipes(new ValidationPipe({ 
    transform: true, 
    whitelist: true, 
    forbidNonWhitelisted: true,
  }));

  app.use(cors({
    origin: "*",
    credentials: true,
  }));

  await app.listen(7000, "0.0.0.0");
}
bootstrap();