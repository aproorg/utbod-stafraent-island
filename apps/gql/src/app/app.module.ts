import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { HealthController } from "./health.controller";
import { maskOutFieldsMiddleware } from "./graphql.middleware";
import responseCachePlugin from "apollo-server-plugin-response-cache";

const debug = process.env.NODE_ENV === "development";
const playground = debug || process.env.GQL_PLAYGROUND_ENABLED === "true";
const isLocalDev = process.env.NODE_ENV !== "production";
const autoSchemaFile = !isLocalDev ? true : "apps/api/src/api.graphql";

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
