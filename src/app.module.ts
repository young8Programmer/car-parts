import { Module } from '@nestjs/common';
import { PartsModule } from './parts/parts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Part } from './parts/entities/part.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/auth.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://vali:wIN4RPOJDLTQ9Qo14AJlvQ@tender-monarch-7282.j77.aws-eu-central-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full',
      entities: [Part, User],
      synchronize: true,
      ssl: {
      rejectUnauthorized: false,
      },
    }),
    PartsModule,
    AuthModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
