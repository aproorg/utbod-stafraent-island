import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Application } from './application.model';
import { CreateApplicationBody } from './application.dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(Application)
    private applicationModel: typeof Application,
  ) {}

  findAll(nationalId?: string): Promise<Application[]> {
    const where = {};
    if (nationalId) {
      where['nationalId'] = nationalId;
    }
    return this.applicationModel.findAll({ where });
  }

  findOneById(id: string): Promise<Application> {
    return this.applicationModel.findOne({ where: { id } });
  }

  create(body: CreateApplicationBody): Promise<Application> {
    return this.applicationModel.create(body);
  }

  update(
    application: Application,
    body: CreateApplicationBody,
  ): Promise<Application> {
    return application.update(body);
  }

  async delete(application: Application): Promise<Application> {
    await application.destroy();
    return application;
  }
}
