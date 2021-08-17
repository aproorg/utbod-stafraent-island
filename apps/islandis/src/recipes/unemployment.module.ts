import { Module } from '@nestjs/common';
import { UnemploymentResolver } from './unemployment.resolver';

@Module({
  providers: [UnemploymentResolver],
})
export class UnemploymentDomainModule {}
