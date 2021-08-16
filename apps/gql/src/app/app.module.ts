import { Module } from "@nestjs/common";
import {
  Args,
  GraphQLModule,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { HealthController } from "./health.controller";
import { maskOutFieldsMiddleware } from "./graphql.middleware";
import responseCachePlugin from "apollo-server-plugin-response-cache";

const debug = process.env.NODE_ENV === "development";
const playground = debug || process.env.GQL_PLAYGROUND_ENABLED === "true";
const isLocalDev = process.env.NODE_ENV !== "production";
const autoSchemaFile = !isLocalDev ? true : "apps/api/src/api.graphql";

import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Post {
  @Field((type) => Int)
  id: number;

  @Field()
  title: string;

  @Field((type) => Int, { nullable: true })
  votes?: number;
}

@ObjectType()
export class Author {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field((type) => [Post])
  posts: Post[];
}

@Resolver((of) => Author)
export class AuthorsResolver {
  constructor() // private authorsService: AuthorsService,
  // private postsService: PostsService
  {}

  @Query((returns) => Author)
  async author(@Args("id", { type: () => Int }) id: number) {
    return null;
    // return this.authorsService.findOneById(id);
  }

  @ResolveField()
  async posts(@Parent() author: Author) {
    const { id } = author;
    return null;
    // return this.postsService.findAll({ authorId: id });
  }
}

@Module({
  controllers: [HealthController],
  imports: [
    GraphQLModule.forRoot({
      debug,
      playground,
      autoSchemaFile,
      path: "/api/graphql",
      buildSchemaOptions: {
        fieldMiddleware: [maskOutFieldsMiddleware],
      },
      plugins: [],
    }),
  ],
})
export class AppModule {}
