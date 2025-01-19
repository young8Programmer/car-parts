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
      url: 'postgresql://postgres:ErdIsXOcisObQVfqzSOJMyQdioQhrHZn@postgres.railway.internal:5432/railway',
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
