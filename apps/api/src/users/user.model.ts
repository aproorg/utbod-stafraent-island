import {
  Column,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class User extends Model {
  @Column({
    primaryKey: true,
  })
  @ApiProperty()
  id: string;

  @Column
  @ApiProperty()
  firstName: string;

  @Column
  @ApiProperty()
  lastName: string;

  @Column({ defaultValue: true })
  @ApiProperty()
  isActive: boolean;

  @CreatedAt
  @ApiProperty()
  readonly createdAt: Date;

  @UpdatedAt
  @ApiProperty()
  readonly updatedAt: Date;
}
