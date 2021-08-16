import { Injectable } from '@nestjs/common';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';
import { SequelizeOptions } from 'sequelize-typescript';

import * as databaseConfig from '../sequelize.config.js';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  createSequelizeOptions(): SequelizeModuleOptions {
    return {
      ...databaseConfig,
      dialect: databaseConfig.dialect as SequelizeOptions['dialect'],
      define: {
        underscored: true,
        timestamps: true,
      },
      dialectOptions: {
        useUTC: true,
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      logging: false,
      autoLoadModels: true,
      synchronize: false,
    };
  }
}
