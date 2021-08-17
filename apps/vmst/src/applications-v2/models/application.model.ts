import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { ChildV2 } from './child.model';
import { PreferredJobV2 } from './preferredJob.model';

@Table({ tableName: 'applications' })
export class ApplicationV2 extends Model {
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
  nationalId: string;

  @HasMany(() => ChildV2)
  @ApiProperty({ type: [ChildV2] })
  children: ChildV2[];

  @HasMany(() => PreferredJobV2)
  @ApiProperty({ type: [PreferredJobV2] })
  preferredJobs: PreferredJobV2[];
}
