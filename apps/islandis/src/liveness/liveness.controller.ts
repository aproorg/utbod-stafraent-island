import { Controller, Get } from '@nestjs/common';

@Controller('/api/liveness')
export class LivenessController {
  @Get()
  getLiveness(): string {
    return 'OK';
  }
}
