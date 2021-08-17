import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';

import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { Application } from './models';

describe('ApplicationController', () => {
  let applicationController: ApplicationController;
  let applicationService: ApplicationService;

  beforeEach(async () => {
    const application: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        ApplicationController,
        {
          provide: ApplicationService,
          useClass: jest.fn(() => ({
            findAll: () => [],
            findOneById: () => [],
          })),
        },
        {
          provide: getModelToken(Application),
          useClass: jest.fn(() => ({})),
        },
      ],
    }).compile();

    applicationController = application.get<ApplicationController>(
      ApplicationController,
    );
    applicationService =
      application.get<ApplicationService>(ApplicationService);
  });

  describe('root', () => {
    const applicationData = {
      id: 'ef83e1da-7be2-44da-910b-9557d4ad03af',
      name: 'Jóna Jónsdóttir',
      address: 'Andesgrund',
      postalCode: 0,
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
    };
    const applicationModel = {
      ...applicationData,
      get: () => applicationData,
    };

    it('should return applications', async () => {
      const query = { nationalId: '2101932009' };
      jest
        .spyOn(applicationService as any, 'findAll')
        .mockImplementation(() => Promise.resolve([applicationModel]));

      const result = await applicationController.getApplications(query);

      expect(result).toEqual([applicationData]);
    });

    it('should get an application', async () => {
      const params = { id: 'b919d435-3686-446b-986b-536877d8f132' };
      jest
        .spyOn(applicationService as any, 'findOneById')
        .mockImplementation(() => Promise.resolve(applicationModel));

      const result = await applicationController.getApplicationById(params);

      expect(result).toEqual(applicationData);
    });

    it('should return 404 if application was not found', async () => {
      const params = { id: 'b919d435-3686-446b-986b-536877d8f132' };
      jest
        .spyOn(applicationService as any, 'findOneById')
        .mockImplementation(() => Promise.resolve(null));

      try {
        await applicationController.getApplicationById(params);
        expect('This should not happen').toEqual('');
      } catch (e) {
        expect(e.response).toEqual({
          statusCode: 404,
          error: 'Not Found',
          message: `Application<${params.id}> not found`,
        });
      }
    });
  });
});
