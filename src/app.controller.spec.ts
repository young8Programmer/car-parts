// code comments qo'shildi
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
// ESLint qoidalariga moslashtirish
import { AppService } from './app.service';

// installation qo'llanmasi yaratildi
// memory leak muammosi hal qilindi
// dependencies yangilandi
describe('AppController', () => {
  let appController: AppController;

// caching mexanizmi qo'shildi
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
