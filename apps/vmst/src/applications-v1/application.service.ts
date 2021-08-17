import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { ApplicationV1, ChildV1, PreferredJobV1 } from './models';
import { CreateApplicationBodyV1 } from './dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(ApplicationV1)
    private applicationModel: typeof ApplicationV1,
    @InjectModel(ChildV1)
    private childModel: typeof ChildV1,
    @InjectModel(PreferredJobV1)
    private preferredJobModel: typeof PreferredJobV1,
  ) {}

  findAll(nationalId?: string): Promise<ApplicationV1[]> {
    const where = {};
    if (nationalId) {
      where['nationalId'] = nationalId;
    }
    return this.applicationModel.findAll({
      where,
      include: [this.childModel, this.preferredJobModel],
    });
  }

  findOneById(id: string): Promise<ApplicationV1> {
    return this.applicationModel.findOne({
      where: { id },
      include: [this.childModel, this.preferredJobModel],
    });
  }

  create(body: CreateApplicationBodyV1): Promise<ApplicationV1> {
    return this.applicationModel.create(body, {
      include: [this.childModel, this.preferredJobModel],
    });
  }

  async update(
    application: ApplicationV1,
    body: CreateApplicationBodyV1,
  ): Promise<ApplicationV1> {
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

  async delete(application: ApplicationV1): Promise<ApplicationV1> {
    await application.destroy();
    return application;
  }
}
