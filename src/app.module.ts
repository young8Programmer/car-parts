import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Part } from './parts/entities/part.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/auth.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PartsModule } from './parts/parts.module';
import * as fs from 'fs';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'tender-monarch-7282.j77.aws-eu-central-1.cockroachlabs.cloud',  // Host
      port: 26257,  // Port
      database: 'defaultdb',  // Database nomi
      username: 'vali',  // Foydalanuvchi nomi
      password: 'wIN4RPOJDLTQ9Qo14AJlvQ',  // Parol
      entities: [Part, User],  // Entity-lar
      synchronize: true,  // Avtomatik jadvallarni yaratish
      ssl: {
        rejectUnauthorized: false,  // SSL tekshiruvi
        ca: fs.readFileSync('C:/Users/valir/AppData/Roaming/postgresql/root.crt').toString(),  // Sertifikat
      },
    }),
    PartsModule,
    AuthModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
