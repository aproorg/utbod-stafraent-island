import { Controller, Get } from "@nestjs/common";
import { HealthCheck, HealthCheckService } from "@nestjs/terminus";
@Controller("health")
export class HealthController {
  constructor() {}

  @Get()
  @HealthCheck()
  check() {
    return true;
  }
}
