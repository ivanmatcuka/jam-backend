import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateEquipmentDto {
  @ApiProperty({
    nullable: true,
    required: false,
  })
  @IsOptional()
  name?: string;

  @ApiProperty({
    nullable: true,
    required: false,
  })
  @IsOptional()
  description?: string;

  @ApiProperty({
    nullable: true,
    required: false,
  })
  @IsOptional()
  equipmentTypeId?: number;

  @ApiProperty({
    nullable: true,
    required: false,
  })
  @IsOptional()
  roomId?: number;
}
