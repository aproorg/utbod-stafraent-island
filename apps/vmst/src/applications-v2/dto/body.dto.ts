import {
  ArrayMinSize,
  IsString,
  IsNumber,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { NationalIdValidator, NoDuplicateValidator } from './validators.dto';

class CreateChildBodyV2 {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @Validate(NationalIdValidator)
  @ApiProperty()
  readonly nationalId: string;
}

class CreatePreferredJobBodyV2 {
  @IsString()
  @ApiProperty()
  readonly job: string;
}

export class CreateApplicationBodyV2 {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @ApiProperty()
  readonly address: string;

  @IsNumber({ maxDecimalPlaces: 0 })
  @ApiProperty()
  readonly postalCode: number;

  @Validate(NationalIdValidator)
  @ApiProperty()
  readonly nationalId: string;

  @Validate(NoDuplicateValidator, ['nationalId'])
  @ValidateNested({ each: true })
  @Type(() => CreateChildBodyV2)
  @ApiProperty({ type: [CreateChildBodyV2] })
  readonly children!: CreateChildBodyV2[];

  @Validate(NoDuplicateValidator, ['job'])
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => CreatePreferredJobBodyV2)
  @ApiProperty({ type: [CreatePreferredJobBodyV2] })
  readonly preferredJobs!: CreatePreferredJobBodyV2[];
}
