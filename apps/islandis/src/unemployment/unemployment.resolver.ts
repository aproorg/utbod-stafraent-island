import { Inject, Logger, NotFoundException } from '@nestjs/common';
import { Args, InputType, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AxiosResponse } from 'axios';
import { InlineResponse200 } from 'gen/thjodskra';
import { UnemployemntApplicationOutput } from './models/model';
import { UnemploymentApplicationInput } from './models/model';
import { VMSTApiService } from './services/unemployment.vmst';
import { NationalRegistryAPIService } from './services/unempolyment.natreg';

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
    const natInfo = await this.natRegApi.getCitizen(application);
    const app = await this.vmstApi.createApplication({
      startDate: application.startDate,
      postalCode: natInfo.PostalCode,
      city: natInfo.City,
      preferredJobs: application.preferredJobs.map((job) => ({
        job: job.name,
      })),
      address: natInfo.Address,
      nationalId: application.nationalId,
      children: await Promise.all(
        application.children.map(async (child) => ({
          name: (await this.natRegApi.getCitizen(child)).Name,
          nationalId: child.nationalId,
        })),
      ),
      name: natInfo.Name,
    });
    this.logger.log(`Application with ID ${app.id} created`);
    return {
      id: app.id,
    };
  }

  @Query((returns) => UnemployemntApplicationOutput)
  async getApplicationById(
    @Args('id') id: string,
  ): Promise<UnemployemntApplicationOutput> {
    return await this.vmstApi.getApplicationById(id);
  }
}
