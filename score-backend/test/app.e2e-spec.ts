import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('Auth Controller (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/auth/login should redirect to Keycloak', () => {
    return request(app.getHttpServer())
      .get('/api/auth/login')
      .expect(302) // Redirect response
      .expect(res => {
        const location = res.header.location;
        expect(location).toContain('http://localhost:8080/realms/score-view-portal/protocol/openid-connect/auth');
      });
  });

  // Các test khác cho protected routes
  it('GET /api/users/me should return 401 when not authenticated', () => {
    return request(app.getHttpServer())
      .get('/api/users/me')
      .expect(401);
  });
});