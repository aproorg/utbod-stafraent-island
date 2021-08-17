import {
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class PreferredJob extends Model {
  @ForeignKey(() => Application)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  @ApiProperty()
  applicationId: string;

  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
  })
  @ApiProperty()
  job: string;

  @CreatedAt
  @ApiProperty()
  readonly createdAt: Date;

  @UpdatedAt
  @ApiProperty()
  readonly updatedAt: Date;
}

@Table({ tableName: 'children' })
export class Child extends Model {
  @ForeignKey(() => Application)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  @ApiProperty()
  applicationId: string;

  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
  })
  @ApiProperty()
  nationalId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty()
  name: string;

  @CreatedAt
  @ApiProperty()
  readonly createdAt: Date;

  @UpdatedAt
  @ApiProperty()
  readonly updatedAt: Date;
}

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
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty()
  address: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty()
  postalCode: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty()
  city: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty()
  nationalId: string;

  @HasMany(() => Child)
  @ApiProperty({ type: [Child] })
  children: Child[];

  @HasMany(() => PreferredJob)
  @ApiProperty({ type: [PreferredJob] })
  preferredJobs: PreferredJob[];

  @CreatedAt
  @ApiProperty()
  readonly createdAt: Date;

  @UpdatedAt
  @ApiProperty()
  readonly updatedAt: Date;
}
