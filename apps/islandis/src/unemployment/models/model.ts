import {
  createUnionType,
  Field,
  ID,
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
@InputType()
export class FullEmployment {}
@ObjectType()
@InputType()
export class PartTimeEmployment {
  @Field()
  @Max(100)
  @Min(0)
  part: number;
}
export const EmploymentType = createUnionType({
  name: 'EmploymentType',
  resolveType: (v) => (v.part ? PartTimeEmployment : FullEmployment),
  types: () => [FullEmployment, PartTimeEmployment],
});
registerEnumType(Regions, {
  name: 'ServiceCenters',
});

@ObjectType()
@InputType()
export class Child {
  @Field()
  nationalId: string;
}

@ObjectType()
@InputType()
export class Job {
  @Field()
  name: string;
}

@InputType()
export class UnemploymentApplicationInput {
  @Field()
  @MaxLength(10)
  @ApiProperty()
  nationalId: string;

  @Field((type) => [Child])
  @ApiProperty()
  children: Child[];

  @Field((type) => [Job])
  preferredJobs: Job[];

  @Field()
  startDate: Date;
}

@ObjectType()
export class UnemployemntApplicationOutput {
  @Field((type) => ID)
  id: string;
}
