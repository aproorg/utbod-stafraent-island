import {
  ArrayMinSize,
  IsString,
  IsNumber,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Type, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { NationalIdValidator } from './validators.dto';

class ChildViewModelV2 {
  @Expose()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @Expose()
  @Validate(NationalIdValidator)
  @ApiProperty()
  readonly nationalId: string;
}

class PreferredJobViewModelV2 {
  @Expose()
  @IsString()
  @ApiProperty()
  readonly job: string;
}

export class ApplicationViewModelV2 {
  @Expose()
  @IsString()
  @ApiProperty()
  readonly id: string;

  @Expose()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @Expose()
  @IsString()
  @ApiProperty()
  readonly address: string;

  @Expose()
  @IsNumber({ maxDecimalPlaces: 0 })
  @ApiProperty()
  readonly postalCode: number;

  @Expose()
  @Validate(NationalIdValidator)
  @ApiProperty()
  readonly nationalId: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => ChildViewModelV2)
  @ApiProperty({ type: [ChildViewModelV2] })
  readonly children!: ChildViewModelV2[];

  @Expose()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => PreferredJobViewModelV2)
  @ApiProperty({ type: [PreferredJobViewModelV2] })
  readonly preferredJobs!: PreferredJobViewModelV2[];
}
