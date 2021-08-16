import {
  Column,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  DataType,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { ApplicantCircumstances } from './application.enum';

@Table
export class Application extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  @ApiProperty()
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty()
  nationalId: string;

  @Column({
    type: DataType.ENUM,
    values: Object.values(ApplicantCircumstances),
    allowNull: false,
  })
  @ApiProperty({ enum: Object.values(ApplicantCircumstances) })
  applicantsCircumstances: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  @ApiProperty()
  personalDiscountRatio: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ApiProperty()
  personalDiscount: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ApiProperty()
  income: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ApiProperty()
  retirementOrDisabilityPaymentFromTryggingarstofnun: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ApiProperty()
  retirementAndDisabilityPaymentFromPensionFunds: number;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  @ApiProperty()
  incomeTaxStep1: number;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  @ApiProperty()
  incomeTaxStep2: number;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  @ApiProperty()
  unionRatio: number;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  @ApiProperty()
  workingRatio: number;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  @ApiProperty()
  pensionFundRatio: number;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  @ApiProperty()
  additionalPensionFundRatio: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  @ApiProperty()
  parentalLeave: boolean;

  @CreatedAt
  @ApiProperty()
  readonly createdAt: Date;

  @UpdatedAt
  @ApiProperty()
  readonly updatedAt: Date;
}
