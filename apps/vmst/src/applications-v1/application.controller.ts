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
  ApiTags,
} from '@nestjs/swagger';
import { classToPlain, plainToClass } from 'class-transformer';

import { ApplicationService } from './application.service';
import { ApplicationV1 } from './models';
import {
  GetApplicationsQuery,
  CreateApplicationBodyV1,
  ApplicationViewModelV1,
  ApplicationIdParams,
} from './dto';

@ApiTags('Applications V1')
@Controller('/api/v1/applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  @ApiOkResponse({ type: ApplicationViewModelV1 })
  async getApplications(
    @Query() query: GetApplicationsQuery,
  ): Promise<ApplicationViewModelV1[]> {
    const applications = await this.applicationService.findAll(
      query.nationalId,
    );
    return this.serializeMany(applications);
  }

  @Get(':id')
  @ApiOkResponse({ type: ApplicationViewModelV1 })
  async getApplicationById(
    @Param() params: ApplicationIdParams,
  ): Promise<ApplicationViewModelV1> {
    const application = await this.getApplicationByIdOrThrowNotFound(params.id);
    return this.serialize(application);
  }

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({ type: ApplicationViewModelV1 })
  async createApplication(
    @Body() body: CreateApplicationBodyV1,
  ): Promise<ApplicationViewModelV1> {
    const application = await this.applicationService.create(body);
    return this.serialize(application);
  }

  @Put(':id')
  @ApiCreatedResponse({ type: ApplicationViewModelV1 })
  async updateApplication(
    @Param() params: ApplicationIdParams,
    @Body() body: CreateApplicationBodyV1,
  ): Promise<ApplicationViewModelV1> {
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
  ): Promise<ApplicationV1> {
    const application = await this.applicationService.findOneById(id);
    if (!application) {
      throw new NotFoundException(`Application<${id}> not found`);
    }
    return application;
  }

  private serializeMany(
    applications: ApplicationV1[],
  ): ApplicationViewModelV1[] {
    return applications.map((application) => this.serialize(application));
  }

  private serialize(application: ApplicationV1): ApplicationViewModelV1 {
    return plainToClass(
      ApplicationViewModelV1,
      classToPlain(application.get({ plain: true })),
      { excludeExtraneousValues: true },
    );
  }
}
