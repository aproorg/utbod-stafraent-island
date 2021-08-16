import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsNumber,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  Validate,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import * as kennitala from 'kennitala';

import { ApplicantCircumstances } from './application.enum';

@ValidatorConstraint({ name: 'customText', async: false })
export class IsValidNationalId implements ValidatorConstraintInterface {
  validate(text: string) {
    return kennitala.isValid(text);
  }

  defaultMessage() {
    return `nationalId is not valid`;
  }
}

export class CreateApplicationBody {
  @Validate(IsValidNationalId)
  @ApiProperty()
  readonly nationalId: string;

  @IsOptional()
  @IsEnum(Object.values(ApplicantCircumstances))
  @ApiProperty({ enum: Object.values(ApplicantCircumstances) })
  readonly applicantsCircumstances?: string;

  @IsNumber()
  @ApiProperty()
  readonly personalDiscountRatio: number;

  @IsNumber({ maxDecimalPlaces: 0 })
  @ApiProperty()
  readonly personalDiscount: number;

  @IsNumber({ maxDecimalPlaces: 0 })
  @ApiProperty()
  readonly income: number;

  @IsNumber({ maxDecimalPlaces: 0 })
  @ApiProperty()
  readonly retirementOrDisabilityPaymentFromTryggingarstofnun: number;

  @IsNumber({ maxDecimalPlaces: 0 })
  @ApiProperty()
  readonly retirementAndDisabilityPaymentFromPensionFunds: number;

  @IsNumber()
  @ApiProperty()
  readonly incomeTaxStep1: number;

  @IsNumber()
  @ApiProperty()
  readonly incomeTaxStep2: number;

  @IsNumber()
  @ApiProperty()
  readonly unionRatio: number;

  @IsNumber()
  @ApiProperty()
  readonly workingRatio: number;

  @IsNumber()
  @ApiProperty()
  readonly pensionFundRatio: number;

  @IsNumber()
  @ApiProperty()
  readonly additionalPensionFundRatio: number;

  @IsBoolean()
  @ApiProperty()
  readonly parentalLeave: boolean;
}

export class GetApplicationsQuery {
  @IsOptional()
  @Validate(IsValidNationalId)
  @ApiPropertyOptional()
  readonly nationalId?: string;
}
