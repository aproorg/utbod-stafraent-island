import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { GraphQLClient, gql } from 'graphql-request';
import { UnemployemntApplicationOutput } from '../src/unemployment/models/model';
import { UnemploymentResolver } from '../src/unemployment/unemployment.resolver';

describe('Unemployment module', () => {
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
            getCitizen: jest.fn(() =>
              Promise.resolve({
                Name: 'Rocket Man',
                SSN: '0101302989',
                Address: 'Some place',
              }),
            ),
          }),
        },
        {
          provide: 'VMST',
          useFactory: () => ({
            getApplicationById: jest.fn((id) =>
              Promise.resolve({
                id: '12',
              }),
            ),
            createApplication: jest.fn(() =>
              Promise.resolve({
                id: '12',
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
            nationalId: "0101302989"
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
      await client.request<UnemployemntApplicationOutput>(retrieveApplication),
    ).toStrictEqual({
      getApplicationById: {
        id: id,
      },
    });
  });
});
