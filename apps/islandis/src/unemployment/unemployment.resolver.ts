import { Inject, Logger, NotFoundException } from '@nestjs/common';
import { Args, InputType, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UnemployemntApplicationOutput } from './models/model';
import { UnemploymentApplicationInput } from './models/model';
import {
  NationalRegistryAPIService,
  VMSTApiService,
} from './unemployment.service';

@InputType()
export class CreateApplicationInput {}

@Resolver((of) => UnemployemntApplicationOutput)
export class UnemploymentResolver {
  private readonly logger = new Logger(UnemploymentResolver.name);
  constructor(
    @Inject('VMST') private readonly vmstApi: VMSTApiService,
    @Inject('NATREG') private readonly natRegApi: NationalRegistryAPIService,
  ) {}

  @Mutation((type) => UnemployemntApplicationOutput)
  async submitApplication(
    @Args({ name: 'application', type: () => UnemploymentApplicationInput })
    application: UnemploymentApplicationInput,
  ): Promise<UnemployemntApplicationOutput> {
    const natInfo = await this.natRegApi.citizenSSNGet(application.nationalId);
    try {
      const app = await this.vmstApi.applicationControllerCreateApplication({
        postalCode: natInfo.data.PostalCode,
        city: natInfo.data.City,
        preferredJobs: application.preferredJobs.map((job) => ({
          job: job.name,
        })),
        address: natInfo.data.Address,
        nationalId: application.nationalId,
        children: await Promise.all(
          application.children.map(async (child) => ({
            name: (
              await this.natRegApi.citizenSSNGet(child.nationalId)
            ).data.Name,
            nationalId: child.nationalId,
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

  @Query((returns) => UnemployemntApplicationOutput)
  async getApplicationById(
    @Args('id') id: string,
  ): Promise<UnemployemntApplicationOutput> {
    const app = await this.vmstApi.applicationControllerGetApplicationById(id);
    return app.data;
  }
}
