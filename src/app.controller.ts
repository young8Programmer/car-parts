// image optimization qo'shildi
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// changelog yangilandi
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
// database connection muammosi hal qilindi
    return this.appService.getHello();
  }
}
