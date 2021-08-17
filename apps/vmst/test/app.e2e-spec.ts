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

  it('/api/v1/applications (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/applications')
      .expect(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('/api/v1/applications/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/applications/ef83e1da-7be2-44da-910b-9557d4ad03af')
      .expect(200)
      .expect({
        id: 'ef83e1da-7be2-44da-910b-9557d4ad03af',
        name: 'Jóna Jónsdóttir',
        address: 'Andesgrund',
        postalCode: 200,
        city: 'Reykjavík',
        nationalId: '0101938189',
        children: [
          {
            name: 'Jón Jónsson',
            nationalId: '0101939159',
          },
        ],
        preferredJobs: [
          {
            job: 'Software Developer',
          },
          {
            job: 'Team Manager',
          },
        ],
      });
  });

  it('/api/v1/applications (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/applications')
      .send({
        name: 'Nonni',
        address: 'Borgartún',
        postalCode: 1000,
        city: 'Reykjavík',
        nationalId: '0101938189',
        children: [
          {
            name: 'Jón Jónsson',
            nationalId: '0101939159',
          },
        ],
        preferredJobs: [
          {
            job: 'Læknir',
          },
          {
            job: 'Þjónn',
          },
        ],
      })
      .expect(201);

    expect(response.body).toEqual({
      id: expect.any(String),
      name: 'Nonni',
      address: 'Borgartún',
      postalCode: 1000,
      city: 'Reykjavík',
      nationalId: '0101938189',
      children: [
        {
          name: 'Jón Jónsson',
          nationalId: '0101939159',
        },
      ],
      preferredJobs: [
        {
          job: 'Læknir',
        },
        {
          job: 'Þjónn',
        },
      ],
    });
  });
});
