import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/auth.entity'; 
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { PartsModule } from 'src/parts/parts.module';
import { Part } from 'src/parts/entities/part.entity';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Part]),
    JwtModule.register({
      global: true,
      secret: "juda_secret_key",
      signOptions: { expiresIn: '1d' },
    }),
    PartsModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
