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
      host: 'postgres.railway.app',  // Railway host
      port: 5432,                   // Default PostgreSQL port
      username: 'postgres',         // Railway username
      password: 'ErdIsXOcisObQVfqzSOJMyQdioQhrHZn',  // Railway password
      database: 'railway',          // Database name
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
