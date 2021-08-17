import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UnemploymentDomainModule } from './recipes/unemployment.module';
import { LivenessModule } from './liveness';

@ObjectType()
export class Post {
  @Field((type) => Int)
  id: number;

  @Field()
  title: string;

  @Field((type) => Int, { nullable: true })
  votes?: number;
}

@Module({
  imports: [
    UnemploymentDomainModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
    }),
    LivenessModule,
  ],
})
export class AppModule {}
