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

class ChildViewModelV1 {
  @Expose()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @Expose()
  @Validate(NationalIdValidator)
  @ApiProperty()
  readonly nationalId: string;
}

class PreferredJobViewModelV1 {
  @Expose()
  @IsString()
  @ApiProperty()
  readonly job: string;
}

export class ApplicationViewModelV1 {
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
  @IsString()
  @ApiProperty()
  readonly city: string;

  @Expose()
  @Validate(NationalIdValidator)
  @ApiProperty()
  readonly nationalId: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => ChildViewModelV1)
  @ApiProperty({ type: [ChildViewModelV1] })
  readonly children!: ChildViewModelV1[];

  @Expose()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => PreferredJobViewModelV1)
  @ApiProperty({ type: [PreferredJobViewModelV1] })
  readonly preferredJobs!: PreferredJobViewModelV1[];
}
