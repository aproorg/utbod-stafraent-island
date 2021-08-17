import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { ApplicationV2, ChildV2, PreferredJobV2 } from './models';

@Module({
  imports: [
    SequelizeModule.forFeature([ApplicationV2, ChildV2, PreferredJobV2]),
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModuleV2 {}
