import { IsOptional, IsUUID, Validate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { NationalIdValidator } from './validators.dto';

export class GetApplicationsQuery {
  @IsOptional()
  @Validate(NationalIdValidator)
  @ApiPropertyOptional()
  readonly nationalId?: string;
}

export class ApplicationIdParams {
  @IsUUID('4')
  @ApiProperty()
  readonly id: string;
}
