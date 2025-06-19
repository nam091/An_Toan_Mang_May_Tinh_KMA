// score-backend/test/app.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { JwtService } from '@nestjs/jwt';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Áp dụng global prefix và pipes giống như trong main.ts
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    jwtService = moduleFixture.get<JwtService>(JwtService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // Sửa đường dẫn từ '/api' thành '/'
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/') // Đường dẫn gốc của AppController
      .expect(200)
      .expect({ status: 'OK' });
  });

  describe('/users (e2e)', () => {
    // Sửa đường dẫn từ '/api/users/some-sub' thành '/users/some-sub'
    it('should return 401 Unauthorized when no token is provided', () => {
      return request(app.getHttpServer())
        .get('/users/some-sub') 
        .expect(401);
    });

    it('should return 403 Forbidden for admin route if user is not admin', () => {
      const userPayload = { sub: 'user-sub', email: 'user@test.com', roles: ['student'] };
      const userToken = jwtService.sign(userPayload);

      return request(app.getHttpServer())
        .get('/users') // Sửa đường dẫn
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);
    });

    it('should return 200 OK for admin route if user is admin', () => {
        const adminPayload = { sub: 'admin-sub', email: 'admin@test.com', roles: ['admin'] };
        const adminToken = jwtService.sign(adminPayload);

        return request(app.getHttpServer())
          .get('/users') // Sửa đường dẫn
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200);
    });

    it('should not return 401 or 403 for a protected route with a valid token', () => {
        const userPayload = { sub: 'user-sub', email: 'user@test.com', roles: ['student'] };
        const userToken = jwtService.sign(userPayload);

        return request(app.getHttpServer())
          .get('/users/user-sub') // Sửa đường dẫn
          .set('Authorization', `Bearer ${userToken}`)
          .expect((res) => {
              if (res.status === 401 || res.status === 403) {
                  throw new Error(`Got ${res.status} instead of passing the guard`);
              }
          });
    });
  });
});