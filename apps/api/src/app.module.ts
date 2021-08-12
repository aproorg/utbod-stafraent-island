import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserModule } from './users';
import { SequelizeConfigService } from './sequelizeConfig.service';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useClass: SequelizeConfigService,
    }),
    UserModule,
  ],
})
export class AppModule {}
