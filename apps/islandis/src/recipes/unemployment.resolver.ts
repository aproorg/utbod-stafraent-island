import { Logger, NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { BenefitApplication } from './models/recipe.model';
import { UnemploymentApplicationService } from './unemployment.service';
import { DefaultApi } from '../../gen/vmst';

const settings =
  process.env.NODE_ENV === 'production'
    ? {
        VMST_API_BASE: process.env.VMST_API_BASE,
      }
    : {
        VMST_API_BASE: 'http://localhost:3333',
      };

@Resolver((of) => BenefitApplication)
export class UnemploymentResolver {
  private readonly logger = new Logger(UnemploymentResolver.name);
  private readonly vmstApi: DefaultApi = new DefaultApi(
    null,
    settings.VMST_API_BASE,
  );
  constructor(
    private readonly recipesService: UnemploymentApplicationService,
  ) {}

  @Query((returns) => BenefitApplication)
  async recipe(@Args('id') id: string): Promise<BenefitApplication> {
    await this.vmstApi.livenessControllerGetLiveness();
    this.logger.error(`Got here`);
    return {
      creationDate: new Date(),
      id: '13423432',
      title: 'title',
      description: 'asfasfds',
      ingredients: [],
    };
    const recipe = await this.recipesService.findOneById(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }
}
