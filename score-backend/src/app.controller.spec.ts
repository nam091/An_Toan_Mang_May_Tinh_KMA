// score-backend/src/app.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return { status: "OK" }', () => { // Sửa mô tả test
      // Sửa câu lệnh kiểm tra từ toBe thành toEqual
      expect(appController.health()).toEqual({ status: 'OK' }); 
    });
  });
});