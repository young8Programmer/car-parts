import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Part } from './parts/entities/part.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/auth.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
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
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'carparts',
      username: 'postgres',
      password: '1234',
      entities: [Part, User, Category],
      synchronize: true,
    }),
    PartsModule,
    AuthModule,
    CategoriesModule,
    CategoriesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
