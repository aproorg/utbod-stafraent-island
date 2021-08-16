import { ApiProperty } from "@nestjs/swagger";

export class Resource {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  nationalId!: string;

  @ApiProperty()
  readonly created!: Date;

  @ApiProperty()
  readonly modified!: Date;
}
