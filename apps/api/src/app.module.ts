import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserModule } from './users';
import { LivenessModule } from './liveness';
import { SequelizeConfigService } from './sequelizeConfig.service';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useClass: SequelizeConfigService,
    }),
    UserModule,
    LivenessModule,
  ],
})
export class AppModule {}
