import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { ApplicationV2, ChildV2, PreferredJobV2 } from './models';
import { CreateApplicationBodyV2 } from './dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(ApplicationV2)
    private applicationModel: typeof ApplicationV2,
    @InjectModel(ChildV2)
    private childModel: typeof ChildV2,
    @InjectModel(PreferredJobV2)
    private preferredJobModel: typeof PreferredJobV2,
  ) {}

  findAll(nationalId?: string): Promise<ApplicationV2[]> {
    const where = {};
    if (nationalId) {
      where['nationalId'] = nationalId;
    }
    return this.applicationModel.findAll({
      where,
      include: [this.childModel, this.preferredJobModel],
    });
  }

  findOneById(id: string): Promise<ApplicationV2> {
    return this.applicationModel.findOne({
      where: { id },
      include: [this.childModel, this.preferredJobModel],
    });
  }

  create(body: CreateApplicationBodyV2): Promise<ApplicationV2> {
    console.log(body);
    return this.applicationModel.create(body, {
      include: [this.childModel, this.preferredJobModel],
    });
  }

  async update(
    application: ApplicationV2,
    body: CreateApplicationBodyV2,
  ): Promise<ApplicationV2> {
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

  async delete(application: ApplicationV2): Promise<ApplicationV2> {
    await application.destroy();
    return application;
  }
}
