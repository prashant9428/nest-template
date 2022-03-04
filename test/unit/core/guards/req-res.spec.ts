import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import { AuthModule } from '@app/auth/auth.module';
import { UsersModule } from '@app/components/users/users.module';
import { setupAPIVersioning } from '@app/core/api.versioning';
import coreBootstrap from '@app/core/bootstrap';
import AppLogger from '@app/core/logger/AppLogger';
import { DatabaseModule } from '@app/db/database.module';

import { TestController } from './controller/test.controller';
import { TestCoreModule } from './module/core-test.module';

describe('Testing binded properties of Request and Response with Encryption mode ON', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestCoreModule, DatabaseModule, UsersModule, AuthModule],
      controllers: [TestController],
      providers: [AppLogger],
    }).compile();

    app = moduleFixture.createNestApplication();
    coreBootstrap(app);
    setupAPIVersioning(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Testing res.success', async () => {
    const config = app.get(ConfigService);
    const jwt = config.get('auth.jwtTokenForTest');
    console.log('JWT TOKEN FOR TEST:', jwt);
    const { body, statusCode }: any = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', 'Bearer ' + jwt);
    expect(body).toBeDefined();
    expect(statusCode).toEqual(StatusCodes.OK);
  });

  it('Testing res.error', async () => {
    const { body, statusCode }: any = await request(app.getHttpServer()).get('/users/test');
    expect(body).toBeDefined();
    expect(statusCode).toEqual(StatusCodes.UNAUTHORIZED);
  });

  it('Testing res.withMeta', async () => {
    const { body, statusCode }: any = await request(app.getHttpServer()).get('/withMeta');
    expect(body).toBeDefined();
    expect(typeof body).toBe('string');
    expect(statusCode).toEqual(StatusCodes.OK);
  });

  it('Testing res.noContent', async () => {
    const { body, statusCode }: any = await request(app.getHttpServer()).get('/noContent');
    expect(body).toBeDefined();
    expect(typeof body).toBe('object');
    expect(statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Testing req.all', async () => {
    const { body, statusCode }: any = await request(app.getHttpServer()).get('/all/test');
    expect(body).toBeDefined();
    expect(typeof body).toBe('string');
    expect(statusCode).toEqual(StatusCodes.OK);
  });

  it('Testing AppLogger', async () => {
    const { body, statusCode }: any = await request(app.getHttpServer()).get('/logger');
    expect(body).toBeDefined();
    expect(typeof body).toBe('string');
    expect(statusCode).toEqual(StatusCodes.OK);
  });
});
