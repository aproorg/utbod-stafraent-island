import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ApplicationModule } from './applications';
import { LivenessModule } from './liveness';
import { SequelizeConfigService } from './sequelizeConfig.service';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useClass: SequelizeConfigService,
    }),
    ApplicationModule,
    LivenessModule,
  ],
})
export class AppModule {}
