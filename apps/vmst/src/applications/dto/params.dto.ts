import { IsOptional, Validate } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { NationalIdValidator } from './validators.dto';

export class GetApplicationsQuery {
  @IsOptional()
  @Validate(NationalIdValidator)
  @ApiPropertyOptional()
  readonly nationalId?: string;
}
