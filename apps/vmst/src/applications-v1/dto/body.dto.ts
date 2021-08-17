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

class CreateChildBodyV1 {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @Validate(NationalIdValidator)
  @ApiProperty()
  readonly nationalId: string;
}

class CreatePreferredJobBodyV1 {
  @IsString()
  @ApiProperty()
  readonly job: string;
}

export class CreateApplicationBodyV1 {
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

  @Validate(NoDuplicateValidator, ['nationalId'])
  @ValidateNested({ each: true })
  @Type(() => CreateChildBodyV1)
  @ApiProperty({ type: [CreateChildBodyV1] })
  readonly children!: CreateChildBodyV1[];

  @Validate(NoDuplicateValidator, ['job'])
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => CreatePreferredJobBodyV1)
  @ApiProperty({ type: [CreatePreferredJobBodyV1] })
  readonly preferredJobs!: CreatePreferredJobBodyV1[];
}
