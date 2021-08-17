import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { GraphQLClient, gql } from 'graphql-request';
import { BenefitApplication } from './models/model';
import { NationalRegistryAPIService, VMSTApiService } from './VMSTApiService';
import { mock, when } from 'ts-mockito';
import { InlineResponse200 } from 'gen/thjodskra';
import { UnemploymentResolver } from './unemployment.resolver';

describe('UnemploymentService', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        GraphQLModule.forRoot({
          autoSchemaFile: true,
        }),
      ],
      providers: [
        {
          provide: 'NATREG',
          useFactory: () => ({
            citizenSSNGet: jest.fn(() =>
              Promise.resolve({
                headers: [],
                status: 200,
                statusText: 'OK',
                config: null,
                data: {
                  Name: 'Rocket Man',
                  SSN: '0101302989',
                  Address: 'Some place',
                },
              }),
            ),
          }),
        },
        {
          provide: 'VMST',
          useFactory: () => ({
            applicationControllerGetApplicationById: jest.fn((id) =>
              Promise.resolve({
                headers: [],
                status: 200,
                statusText: 'OK',
                config: null,
                data: {
                  id: '12',
                },
              }),
            ),
            applicationControllerCreateApplication: jest.fn(() =>
              Promise.resolve({
                headers: [],
                status: 200,
                statusText: 'OK',
                config: null,
                data: {
                  id: '12',
                },
              }),
            ),
          }),
        },
        UnemploymentResolver,
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    await app.listen(10000);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return some object with same ID', async () => {
    const endpoint = await app.getUrl();
    const client = new GraphQLClient(`${endpoint}/graphql`, {});
    const createApplication = gql`
      mutation {
        submitApplication(
          application: {
            socialId: "0101302989"
            children: []
            preferredJobs: [{ name: "developer" }, { name: "manager" }]
            startDate: "2021-10-01"
          }
        ) {
          id
        }
      }
    `;
    const applicationCreated = await client.request(createApplication);
    const id = applicationCreated.submitApplication.id;

    expect(id).toBeTruthy();

    const retrieveApplication = gql`
      {
        getApplicationById(id: "${id}") {
          id
        }
      }
    `;
    expect(
      await client.request<BenefitApplication>(retrieveApplication),
    ).toStrictEqual({
      getApplicationById: {
        id: id,
      },
    });
  });
});
