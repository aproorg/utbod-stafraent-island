import {
  ArrayMinSize,
  IsString,
  IsNumber,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { NationalIdValidator } from './validators.dto';

class CreateChildBody {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @Validate(NationalIdValidator)
  @ApiProperty()
  readonly nationalId: string;
}

class CreatePreferredJobBody {
  @IsString()
  @ApiProperty()
  readonly job: string;
}

export class CreateApplicationBody {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @ApiProperty()
  readonly address: string;

  @IsNumber({ maxDecimalPlaces: 0 })
  @ApiProperty()
  readonly postalCode: number;

  @IsString()
  @ApiProperty()
  readonly city: string;

  @Validate(NationalIdValidator)
  @ApiProperty()
  readonly nationalId: string;

  @ValidateNested({ each: true })
  @Type(() => CreateChildBody)
  @ApiProperty({ type: [CreateChildBody] })
  readonly children!: CreateChildBody[];

  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => CreatePreferredJobBody)
  @ApiProperty({ type: [CreatePreferredJobBody] })
  readonly preferredJobs!: CreatePreferredJobBody[];
}
