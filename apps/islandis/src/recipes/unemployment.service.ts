import { Injectable } from '@nestjs/common';
import { BenefitApplication } from './models/recipe.model';

import {
  createUnionType,
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsOptional, Length, Max, MaxLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum Regions {
  East,
  CapitalArea,
  NorthEast,
  NorthWest,
  South,
  Sudurnes,
  Westfjords,
  West,
}
@ObjectType()
export class FullEmployment {}
@ObjectType()
export class PartTimeEmployment {
  @Field()
  @Max(100)
  @Min(0)
  part: number;
}
export const EmploymentType = createUnionType({
  name: 'EmploymentType',
  types: () => [FullEmployment, PartTimeEmployment],
});
registerEnumType(Regions, {
  name: 'ServiceCenters',
});

@ObjectType()
export class Child {
  @Field()
  name: string;
  @Field()
  socialId: string;
}

@InputType()
export class UnemploymentApplicationInput {
  @Field()
  @MaxLength(150)
  @ApiProperty()
  name: string;

  @Field()
  @MaxLength(150)
  @ApiProperty()
  address: string;

  @Field()
  @MaxLength(10)
  @ApiProperty()
  postalAddress: string;

  @Field()
  @MaxLength(10)
  @ApiProperty()
  socialId: string;

  // @Field()
  // serviceCenter: Regions;

  // @Field()
  // @MaxLength(150)
  // email: string;

  // @Field()
  // @MaxLength(150)
  // mobilePhone: string;

  // @Field()
  // @MaxLength(150)
  // homePhone: string;

  // @Field()
  // @MaxLength(150)
  // secret: string;

  @Field()
  @ApiProperty()
  children: Child[];

  // preferredJob: Job[];
  // career: Employment[];

  @Field()
  employment: typeof EmploymentType;

  @Field()
  additionalWorkLocation: Regions;

  @Field()
  startDate: Date;
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
