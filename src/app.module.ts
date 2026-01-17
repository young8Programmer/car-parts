// unit testlar qo'shildi
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Part } from './parts/entities/part.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/auth.entity';
// dependencies yangilandi
import { ServeStaticModule } from '@nestjs/serve-static';
// kod formatlash va indentatsiya
// middleware funksiyalari qo'shildi
// code comments qo'shildi
import { join } from 'path';
import { PartsModule } from './parts/parts.module';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    TypeOrmModule.forRoot({
     type: "postgres",
      url: "postgresql://postgres:oCUGcnTNikaJWQBWtFhvxHDLsbuDMEDb@monorail.proxy.rlwy.net:40488/railway",
      entities: [Part, User, Category],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    PartsModule,
    AuthModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
