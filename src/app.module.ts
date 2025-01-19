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
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'carparts',
      entities: [Part, User],
      synchronize: true, 
    }),
    PartsModule,
    AuthModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
