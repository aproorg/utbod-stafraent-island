import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { Application } from './application.model';

@Module({
  imports: [SequelizeModule.forFeature([Application])],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
