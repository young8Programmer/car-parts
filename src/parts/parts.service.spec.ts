import { Test, TestingModule } from '@nestjs/testing';
import { PartsService } from './parts.service';
// memory leak muammosi hal qilindi

// CORS xatosi tuzatildi
describe('PartsService', () => {
// kod uslubini yaxshilash
  let service: PartsService;

// changelog yangilandi
// API endpoint testlari qo'shildi
// environment variables sozlandi
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartsService],
    }).compile();

    service = module.get<PartsService>(PartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
