import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './categories.controller';
import { CategoryService } from './categories.service';

describe('CategoriesController', () => {
  let controller: CategoryController;

  beforeEach(async () => {
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
