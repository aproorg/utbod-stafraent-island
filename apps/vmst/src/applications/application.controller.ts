import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { classToPlain, plainToClass } from 'class-transformer';

import { ApplicationService } from './application.service';
import { Application } from './models';
import {
  GetApplicationsQuery,
  CreateApplicationBody,
  ApplicationViewModel,
  ApplicationIdParams,
} from './dto';

@Controller('/api/applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  @ApiOkResponse({ type: ApplicationViewModel })
  async getApplications(
    @Query() query: GetApplicationsQuery,
  ): Promise<ApplicationViewModel[]> {
    const applications = await this.applicationService.findAll(
      query.nationalId,
    );
    return this.serializeMany(applications);
  }

  @Get(':id')
  @ApiOkResponse({ type: ApplicationViewModel })
  async getApplicationById(
    @Param() params: ApplicationIdParams,
  ): Promise<ApplicationViewModel> {
    const application = await this.getApplicationByIdOrThrowNotFound(params.id);
    return this.serialize(application);
  }

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({ type: ApplicationViewModel })
  async createApplication(
    @Body() body: CreateApplicationBody,
  ): Promise<ApplicationViewModel> {
    const application = await this.applicationService.create(body);
    return this.serialize(application);
  }

  @Put(':id')
  @ApiCreatedResponse({ type: ApplicationViewModel })
  async updateApplication(
    @Param() params: ApplicationIdParams,
    @Body() body: CreateApplicationBody,
  ): Promise<ApplicationViewModel> {
    const application = await this.getApplicationByIdOrThrowNotFound(params.id);
    const updatedApplication = await this.applicationService.update(
      application,
      body,
    );
    return this.serialize(updatedApplication);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse()
  async deleteApplication(@Param() params: ApplicationIdParams): Promise<void> {
    const application = await this.getApplicationByIdOrThrowNotFound(params.id);
    await this.applicationService.delete(application);
  }

  private async getApplicationByIdOrThrowNotFound(
    id: string,
  ): Promise<Application> {
    const application = await this.applicationService.findOneById(id);
    if (!application) {
      throw new NotFoundException(`Application<${id}> not found`);
    }
    return application;
  }

  private serializeMany(applications: Application[]): ApplicationViewModel[] {
    return applications.map((application) => this.serialize(application));
  }

  private serialize(application: Application): ApplicationViewModel {
    return plainToClass(
      ApplicationViewModel,
      classToPlain(application.get({ plain: true })),
      { excludeExtraneousValues: true },
    );
  }
}
