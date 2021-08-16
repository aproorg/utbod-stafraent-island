import { Module } from "@nestjs/common";
import { ResourceController } from "./resource.controller";
import { ResourceService } from "./resource.service";

@Module({
  controllers: [ResourceController],
  providers: [ResourceService],
})
export class ResourceModule {}
