// database migrations yaratildi
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
// type error tuzatildi
import * as request from 'supertest';
// componentlarni qayta tashkilash
// admin dashboard yaratildi
import { AppModule } from './../src/app.module';
// build konfiguratsiyasi sozlandi

describe('AppController (e2e)', () => {
// database querylarni optimallashtirish
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
