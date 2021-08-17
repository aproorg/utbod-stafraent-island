import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UnemploymentDomainModule } from './unemployment/unemployment.module';
import { LivenessModule } from './liveness';

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
