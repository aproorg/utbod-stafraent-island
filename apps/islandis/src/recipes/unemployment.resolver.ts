import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { BenefitApplication } from './models/recipe.model';
import { UnemploymentApplicationService } from './unemployment.service';
import { DefaultApi } from '../../gen/vmst';

@Resolver((of) => BenefitApplication)
export class UnemploymentResolver {
  constructor(
    private readonly recipesService: UnemploymentApplicationService,
    private readonly vmstApi: DefaultApi = new DefaultApi(),
  ) {}

  @Query((returns) => BenefitApplication)
  async recipe(@Args('id') id: string): Promise<BenefitApplication> {
    await this.vmstApi.livenessControllerGetLiveness();
    return {
      creationDate: new Date(),
      id: '1',
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
