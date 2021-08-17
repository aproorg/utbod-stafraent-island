import { Logger, NotFoundException } from '@nestjs/common';
import { Args, InputType, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BenefitApplication } from './models/model';
import { UnemploymentApplicationInput } from './models/model';
import { DefaultApi as VMSTApi } from '../../gen/vmst';
import { DefaultApi as NationalRegistryAPI } from '../../gen/thjodskra';

const settings =
  process.env.NODE_ENV === 'production'
    ? {
        VMST_API_BASE: process.env.VMST_API_BASE,
        NATIONAL_REGISTRY_API_BASE: 'https://thjodskra.island.andes.cloud',
      }
    : {
        VMST_API_BASE: 'http://localhost:3333',
        NATIONAL_REGISTRY_API_BASE: 'https://thjodskra.island.andes.cloud',
      };

@InputType()
export class CreateApplicationInput {}

@Resolver((of) => BenefitApplication)
export class UnemploymentResolver {
  private readonly logger = new Logger(UnemploymentResolver.name);
  private readonly vmstApi: VMSTApi = new VMSTApi(null, settings.VMST_API_BASE);
  private readonly natRegApi: NationalRegistryAPI = new NationalRegistryAPI(
    null,
    settings.NATIONAL_REGISTRY_API_BASE,
  );

  @Mutation((type) => BenefitApplication)
  async submitApplication(
    @Args({ name: 'application', type: () => UnemploymentApplicationInput })
    application: UnemploymentApplicationInput,
  ): Promise<BenefitApplication> {
    const natInfo = await this.natRegApi.citizenSSNGet(application.socialId);
    try {
      const app = await this.vmstApi.applicationControllerCreateApplication({
        postalCode: natInfo.data.PostalCode,
        city: natInfo.data.City,
        preferredJobs: application.preferredJobs.map((job) => ({
          job: job.name,
        })),
        address: natInfo.data.Address,
        nationalId: application.socialId,
        children: await Promise.all(
          application.children.map(async (child) => ({
            name: (
              await this.natRegApi.citizenSSNGet(child.socialId)
            ).data.Name,
            nationalId: child.socialId,
          })),
        ),
        name: natInfo.data.Name,
      });
      this.logger.log(`Application with ID ${app.data.id} created`);
      return {
        id: app.data.id,
      };
    } catch (e) {
      this.logger.error(JSON.stringify(e));
      throw e;
    }
  }

  @Query((returns) => BenefitApplication)
  async getApplicationById(
    @Args('id') id: string,
  ): Promise<BenefitApplication> {
    const app = await this.vmstApi.applicationControllerGetApplicationById(id);
    return app.data;
  }
}
