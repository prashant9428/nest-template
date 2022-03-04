import { INestApplication, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import { AppModule } from '@app/app.module';
import coreBootstrap from '@app/core/bootstrap';

describe('Testing API Versioning', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    coreBootstrap(app);
  });

  afterEach(async () => {
    await app.close();
  });

  it('Should return response from version 1 along with 200 status code - VersioningType - URI', async () => {
    app.enableVersioning({
      type: VersioningType.URI,
    });
    await app.init();

    const { status, body } = await request(app.getHttpServer()).get('/v1/users');
    expect(status).toEqual(StatusCodes.OK);
    const { data } = body;
    expect(data).toEqual('Response from API version 1');
  });

  it('Should return response from version 1 along with 200 status code - VersioningType - MEDIA_TYPE', async () => {
    const config = app.get(ConfigService);
    app.enableVersioning({
      type: VersioningType.MEDIA_TYPE,
      key: config.get('app.apiVersioningKey'),
    });
    await app.init();

    const { status, body } = await request(app.getHttpServer()).get('/users').set('Accept', 'application/json;v=1');

    expect(status).toEqual(StatusCodes.OK);
    const { data } = body;
    expect(data).toEqual('Response from API version 1');
  });

  it('Should return response from version 1 along with 200 status code - VersioningType - HEADER', async () => {
    const config = app.get(ConfigService);
    app.enableVersioning({
      type: VersioningType.HEADER,
      header: config.get('app.apiVersioningHeader'),
    });
    await app.init();

    const { status, body } = await request(app.getHttpServer()).get('/users').set('custom', '1');

    expect(status).toEqual(StatusCodes.OK);
    const { data } = body;
    expect(data).toEqual('Response from API version 1');
  });
});
