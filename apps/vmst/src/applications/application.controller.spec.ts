import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { Application } from './models/application.model';

describe('ApplicationController', () => {
  let applicationController: ApplicationController;
  let applicationService: ApplicationService;

  beforeEach(async () => {
    const application: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationController],
      providers: [
        {
          provide: ApplicationService,
          useClass: jest.fn(() => ({
            findAll: () => [],
          })),
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
    it('should return applications', async () => {
      // const applications: Application[] = [
      //   {
      //     id: '1',
      //     firstName: 'Jón',
      //     lastName: 'Jónsson',
      //     isActive: true,
      //   },
      // ] as Application[];
      // jest
      //   .spyOn(applicationService, 'findAll')
      //   .mockImplementation(() => Promise.resolve(applications));
      // const result = await applicationController.getApplications();
      // expect(result).toEqual(applications);
    });
  });
});
