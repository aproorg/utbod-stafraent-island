import { Injectable, Logger } from '@nestjs/common';
import { ApplicationsV1Api as VMSTApi } from '../../../gen/vmst';

@Injectable()
export class VMSTApiService {
  private readonly logger = new Logger(VMSTApiService.name);
  private readonly vmstApi: VMSTApi;

  constructor(basePath: string | VMSTApi) {
    if (typeof basePath === 'string') {
      this.vmstApi = new VMSTApi(null, basePath);
    } else {
      this.vmstApi = basePath;
    }
  }

  async createApplication(form: {
    nationalId: string;
    children: { name: string; nationalId: string }[];

    preferredJobs: { job: string }[];
    startDate: Date;
    address: string;
    name: string;
    postalCode: number;
    city: string;
  }) {
    try {
      const app = await this.vmstApi.applicationControllerCreateApplication(
        form,
      );
      this.logger.log(`Application with ID ${app.data.id} created`);
      return {
        id: app.data.id,
      };
    } catch (e) {
      this.logger.error(
        `Error processing application for kennitala ending in ${form.nationalId.slice(
          6,
        )}`,
      );
      throw new Error(`Error creating application with VMST: ${e.message}`);
    }
  }
  async getApplicationById(id: string) {
    const application =
      this.vmstApi.applicationControllerGetApplicationById(id);
    return { id: (await application).data.id };
  }
}
