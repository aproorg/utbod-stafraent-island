import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Application, Child, PreferredJob } from './application.model';
import { CreateApplicationBody } from './dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(Application)
    private applicationModel: typeof Application,
    @InjectModel(Child)
    private childModel: typeof Child,
    @InjectModel(PreferredJob)
    private preferredJobModel: typeof PreferredJob,
  ) {}

  findAll(nationalId?: string): Promise<Application[]> {
    const where = {};
    if (nationalId) {
      where['nationalId'] = nationalId;
    }
    return this.applicationModel.findAll({
      where,
      include: [this.childModel, this.preferredJobModel],
    });
  }

  findOneById(id: string): Promise<Application> {
    return this.applicationModel.findOne({
      where: { id },
      include: [this.childModel, this.preferredJobModel],
    });
  }

  create(body: CreateApplicationBody): Promise<Application> {
    return this.applicationModel.create(body, {
      include: [this.childModel, this.preferredJobModel],
    });
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
