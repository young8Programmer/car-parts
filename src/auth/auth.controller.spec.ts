// user authentication qo'shildi
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
// code comments qo'shildi
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
// database querylarni optimallashtirish

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
