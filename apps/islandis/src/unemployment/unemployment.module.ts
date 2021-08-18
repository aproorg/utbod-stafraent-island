import { Module } from '@nestjs/common';
import { UnemploymentResolver } from './unemployment.resolver';
import { VMSTApiService } from './services/unemployment.vmst';
import { NationalRegistryAPIService } from './services/unempolyment.natreg';

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
      useFactory: () => new VMSTApiService(settings.VMST_API_BASE),
    },
    {
      provide: 'NATREG',
      useFactory: () =>
        new NationalRegistryAPIService(settings.NATIONAL_REGISTRY_API_BASE),
    },
  ],
})
export class UnemploymentDomainModule {}
