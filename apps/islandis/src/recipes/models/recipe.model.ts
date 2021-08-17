import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BenefitApplication {
  @Field((type) => ID)
  id: string;
}
