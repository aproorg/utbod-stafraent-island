import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { ApplicationV1, ChildV1, PreferredJobV1 } from './models';

@Module({
  imports: [
    SequelizeModule.forFeature([ApplicationV1, ChildV1, PreferredJobV1]),
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModuleV1 {}
