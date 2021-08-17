import { Module } from '@nestjs/common';
import { UnemploymentResolver } from './unemployment.resolver';
import { NationalRegistryAPIService, VMSTApiService } from './VMSTApiService';

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

@Module({
  providers: [
    UnemploymentResolver,
    {
      provide: 'VMST',
      useFactory: () => new VMSTApiService(null, settings.VMST_API_BASE),
    },
    {
      provide: 'NATREG',
      useFactory: () =>
        new NationalRegistryAPIService(
          null,
          settings.NATIONAL_REGISTRY_API_BASE,
        ),
    },
  ],
})
export class UnemploymentDomainModule {}
