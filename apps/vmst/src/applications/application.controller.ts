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
} from '@nestjs/common';
import { ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';

import { ApplicationService } from './application.service';
import { Application } from './application.model';
import { GetApplicationsQuery, CreateApplicationBody } from './application.dto';

@Controller('/api/applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  @ApiOkResponse({ type: Application })
  getApplications(
    @Query() query: GetApplicationsQuery,
  ): Promise<Application[]> {
    return this.applicationService.findAll(query.nationalId);
  }

  @Get(':id')
  @ApiOkResponse({ type: Application })
  getApplicationById(@Param('id') id: string): Promise<Application> {
    return this.getApplicationByIdOrThrowNotFound(id);
  }

  @Post()
  @ApiCreatedResponse({ type: Application })
  createApplication(@Body() body: CreateApplicationBody): Promise<Application> {
    return this.applicationService.create(body);
  }

  @Put(':id')
  @ApiCreatedResponse({ type: Application })
  async updateApplication(
    @Param('id') id: string,
    @Body() body: CreateApplicationBody,
  ): Promise<Application> {
    const application = await this.getApplicationByIdOrThrowNotFound(id);
    return this.applicationService.update(application, body);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: Application })
  async deleteApplication(@Param('id') id: string): Promise<Application> {
    const application = await this.getApplicationByIdOrThrowNotFound(id);
    await this.applicationService.delete(application);
    return application;
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
}
