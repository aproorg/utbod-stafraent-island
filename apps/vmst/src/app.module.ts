import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ApplicationModuleV1 } from './applications-v1';
import { ApplicationModuleV2 } from './applications-v2';
import { LivenessModule } from './liveness';
import { SequelizeConfigService } from './sequelizeConfig.service';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useClass: SequelizeConfigService,
    }),
    ApplicationModuleV1,
    ApplicationModuleV2,
    LivenessModule,
  ],
})
export class AppModule {}
