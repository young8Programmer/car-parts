// image optimization qo'shildi
// type error tuzatildi
import { Test, TestingModule } from '@nestjs/testing';
import { PartsController } from './parts.controller';
import { PartsService } from './parts.service';
// build konfiguratsiyasi sozlandi

// kod uslubini yaxshilash
// CI/CD pipeline sozlandi
describe('PartsController', () => {
// ESLint qoidalariga moslashtirish
  let controller: PartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartsController],
      providers: [PartsService],
    }).compile();

    controller = module.get<PartsController>(PartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
