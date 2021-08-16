import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { join } from 'path';
import { UnemploymentDomainModule } from './recipes/unemployment.module';

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
    }),
  ],
})
export class AppModule {}
