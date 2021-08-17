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
import { ApplicationV2 } from './models';
import {
  GetApplicationsQuery,
  CreateApplicationBodyV2,
  ApplicationViewModelV2,
  ApplicationIdParams,
} from './dto';

@ApiTags('Applications V2')
@Controller('/api/v2/applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  @ApiOkResponse({ type: ApplicationViewModelV2 })
  async getApplications(
    @Query() query: GetApplicationsQuery,
  ): Promise<ApplicationViewModelV2[]> {
    const applications = await this.applicationService.findAll(
      query.nationalId,
    );
    return this.serializeMany(applications);
  }

  @Get(':id')
  @ApiOkResponse({ type: ApplicationViewModelV2 })
  async getApplicationById(
    @Param() params: ApplicationIdParams,
  ): Promise<ApplicationViewModelV2> {
    const application = await this.getApplicationByIdOrThrowNotFound(params.id);
    return this.serialize(application);
  }

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({ type: ApplicationViewModelV2 })
  async createApplication(
    @Body() body: CreateApplicationBodyV2,
  ): Promise<ApplicationViewModelV2> {
    const application = await this.applicationService.create(body);
    return this.serialize(application);
  }

  @Put(':id')
  @ApiCreatedResponse({ type: ApplicationViewModelV2 })
  async updateApplication(
    @Param() params: ApplicationIdParams,
    @Body() body: CreateApplicationBodyV2,
  ): Promise<ApplicationViewModelV2> {
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
  ): Promise<ApplicationV2> {
    const application = await this.applicationService.findOneById(id);
    if (!application) {
      throw new NotFoundException(`Application<${id}> not found`);
    }
    return application;
  }

  private serializeMany(
    applications: ApplicationV2[],
  ): ApplicationViewModelV2[] {
    return applications.map((application) => this.serialize(application));
  }

  private serialize(application: ApplicationV2): ApplicationViewModelV2 {
    return plainToClass(
      ApplicationViewModelV2,
      classToPlain(application.get({ plain: true })),
      { excludeExtraneousValues: true },
    );
  }
}
