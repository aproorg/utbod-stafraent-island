import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Application, Child, PreferredJob } from './models';
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

  async update(
    application: Application,
    body: CreateApplicationBody,
  ): Promise<Application> {
    await Promise.all(
      application.preferredJobs.map((preferredJob) => preferredJob.destroy()),
    );
    await Promise.all(
      body.preferredJobs.map((preferredJob) =>
        this.preferredJobModel.create({
          ...preferredJob,
          applicationId: application.id,
        }),
      ),
    );
    await Promise.all(application.children.map((child) => child.destroy()));
    await Promise.all(
      body.children.map((child) =>
        this.childModel.create({ ...child, applicationId: application.id }),
      ),
    );
    await application.update(body);
    return application;
  }

  async delete(application: Application): Promise<Application> {
    await application.destroy();
    return application;
  }
}
