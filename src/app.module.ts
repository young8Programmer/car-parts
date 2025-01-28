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
      url: process.env.DATABASE_URL || "postgresql://postgresql_9eoz_user:Xp2A37RfR5ypHiWckZY6GsOohzndOCnm@dpg-cu6iq1dsvqrc738j18c0-a.oregon-postgres.render.com/postgresql_9eoz",
      entities: [Part, User, Category],
      ssl: {
        rejectUnauthorized: false,
      },
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
