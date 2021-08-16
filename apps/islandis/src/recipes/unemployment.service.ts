import { Injectable } from '@nestjs/common';
import { BenefitApplication } from './models/recipe.model';

import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class UnemploymentApplicationInput {
  @Field()
  @MaxLength(30)
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  description?: string;

  @Field((type) => [String])
  ingredients: string[];
}

@Injectable()
export class UnemploymentApplicationService {
  async create(
    data: UnemploymentApplicationInput,
  ): Promise<BenefitApplication> {
    return {} as any;
  }

  async findOneById(id: string): Promise<BenefitApplication> {
    return {} as any;
  }
}
