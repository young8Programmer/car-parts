import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Part } from './parts/entities/part.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/auth.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PartsModule } from './parts/parts.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cu6iq1dsvqrc738j18c0-a', // Postgres host
      port: 5432, // Postgres port
      database: 'postgresql_9eoz', // Ma'lumotlar bazasi nomi
      username: 'postgresql_9eoz_user', // Foydalanuvchi nomi
      password: 'Xp2A37RfR5ypHiWckZY6GsOohzndOCnm', // Parolni kiriting
      entities: [Part, User], // Entitylar
      synchronize: true, // Ma'lumotlar bazasi jadval tuzilmasini sinxronlashtirish
    }),
    PartsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
