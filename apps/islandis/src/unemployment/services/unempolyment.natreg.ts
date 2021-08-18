import { Injectable, Logger } from '@nestjs/common';
import { DefaultApi as NationalRegistryAPI } from '../../../gen/thjodskra';

@Injectable()
export class NationalRegistryAPIService {
  private readonly logger = new Logger(NationalRegistryAPIService.name);
  private readonly vmstApi: NationalRegistryAPI;

  constructor(basePath: string | NationalRegistryAPI) {
    if (typeof basePath === 'string') {
      this.vmstApi = new NationalRegistryAPI(null, basePath);
    } else {
      this.vmstApi = basePath;
    }
  }

  async getCitizen(applic: { nationalId: string }) {
    try {
      const citizen = await this.vmstApi.citizenSSNGet(applic.nationalId);
      this.logger.debug(`Info about citizen retrieved`);
      return citizen.data;
    } catch (e) {
      this.logger.error(
        `Error retrieving information from National Regitry for nationalId ending in ${applic.nationalId.slice(
          6,
        )}`,
      );
      throw new Error(
        `Error retrieving information from National Regitry: ${e.message}`,
      );
    }
  }
}
