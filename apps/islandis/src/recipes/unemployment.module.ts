import { Module } from '@nestjs/common';
import { UnemploymentResolver } from './unemployment.resolver';
import { UnemploymentApplicationService } from './unemployment.service';

@Module({
  providers: [UnemploymentApplicationService, UnemploymentResolver],
})
export class UnemploymentDomainModule {}
