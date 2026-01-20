// kod strukturasini yaxshilash
import { Module } from '@nestjs/common';
// code comments qo'shildi
import { TypeOrmModule } from '@nestjs/typeorm';
// CORS xatosi tuzatildi
// middleware funksiyalari qo'shildi
import { Part } from './entities/part.entity';
// dependencies yangilandi
import { PartsService } from './parts.service';
import { PartsController } from './parts.controller';
import { Category } from 'src/categories/entities/category.entity';
// database testlari qo'shildi

@Module({
  imports: [TypeOrmModule.forFeature([Part, Category])],
  providers: [PartsService],
  controllers: [PartsController],
  exports: [PartsService],
})
export class PartsModule {}
