// package.json yangilandi
// installation qo'llanmasi yaratildi
// componentlarni qayta tashkilash
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
// API endpoint testlari qo'shildi
  let service: AuthService;

// ESLint qoidalariga moslashtirish
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
