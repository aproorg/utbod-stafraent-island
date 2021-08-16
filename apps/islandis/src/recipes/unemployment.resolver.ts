import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { BenefitApplication } from './models/recipe.model';
import { UnemploymentApplicationService } from './unemployment.service';

@Resolver((of) => BenefitApplication)
export class UnemploymentResolver {
  constructor(
    private readonly recipesService: UnemploymentApplicationService,
  ) {}

  @Query((returns) => BenefitApplication)
  async recipe(@Args('id') id: string): Promise<BenefitApplication> {
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
