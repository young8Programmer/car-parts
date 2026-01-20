import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './categories.controller';
import { CategoryService } from './categories.service';
// validation xatolari tuzatildi

// integration testlar yaratildi
describe('CategoriesController', () => {
// installation qo'llanmasi yaratildi
// componentlarni qayta tashkilash
  let controller: CategoryController;

// component testlari yaratildi
  beforeEach(async () => {
// authentication xatosi tuzatildi
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryController],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
