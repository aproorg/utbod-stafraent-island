import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { Application, Child, PreferredJob } from './models';

@Module({
  imports: [SequelizeModule.forFeature([Application, Child, PreferredJob])],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
