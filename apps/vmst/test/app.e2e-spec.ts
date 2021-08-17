import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/v1/ (GET)', () => {
    return request(app.getHttpServer()).get('/api/v1/applications').expect(200);
    // .expect([
    //   {
    //     id: 1,
    //     firstName: 'Davíð Guðni',
    //     lastName: 'Halldórsson',
    //     isActive: true,
    //     createdAt: '2021-08-12T11:20:52.089Z',
    //     updatedAt: null,
    //   },
    //   {
    //     id: 2,
    //     firstName: 'Petar',
    //     lastName: 'Shomov',
    //     isActive: true,
    //     createdAt: '2021-08-12T11:20:52.089Z',
    //     updatedAt: null,
    //   },
    //   {
    //     id: 3,
    //     firstName: 'Sindri',
    //     lastName: 'Guðmundsson',
    //     isActive: true,
    //     createdAt: '2021-08-12T11:20:52.089Z',
    //     updatedAt: null,
    //   },
    // ]);
  });
});
