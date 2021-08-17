import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { ChildV1 } from './child.model';
import { PreferredJobV1 } from './preferredJob.model';

@Table({ tableName: 'applications' })
export class ApplicationV1 extends Model {
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

  @HasMany(() => ChildV1)
  @ApiProperty({ type: [ChildV1] })
  children: ChildV1[];

  @HasMany(() => PreferredJobV1)
  @ApiProperty({ type: [PreferredJobV1] })
  preferredJobs: PreferredJobV1[];
}
