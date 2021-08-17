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

class ChildViewModel {
  @Expose()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @Expose()
  @Validate(NationalIdValidator)
  @ApiProperty()
  readonly nationalId: string;
}

class PreferredJobViewModel {
  @Expose()
  @IsString()
  @ApiProperty()
  readonly job: string;
}

export class ApplicationViewModel {
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
  @Type(() => ChildViewModel)
  @ApiProperty({ type: [ChildViewModel] })
  readonly children!: ChildViewModel[];

  @Expose()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => PreferredJobViewModel)
  @ApiProperty({ type: [PreferredJobViewModel] })
  readonly preferredJobs!: PreferredJobViewModel[];
}
