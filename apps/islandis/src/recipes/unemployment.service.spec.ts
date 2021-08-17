import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { UnemploymentDomainModule } from './unemployment.module';
import { GraphQLClient, gql } from 'graphql-request';
import { BenefitApplication } from './models/recipe.model';

describe('UnemploymentService', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UnemploymentDomainModule,
        GraphQLModule.forRoot({
          autoSchemaFile: true,
        }),
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

    const query = gql`
      {
        recipe(id: "0") {
          id
        }
      }
    `;
    expect(await client.request<BenefitApplication>(query)).toStrictEqual({
      recipe: {
        id: '1',
      },
    });
  });
});
