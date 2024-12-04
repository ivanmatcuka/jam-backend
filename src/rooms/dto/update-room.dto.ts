import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateRoomDto {
  @ApiProperty({
    nullable: true,
    required: false,
  })
  @IsOptional()
  name: string;

  @ApiProperty({
    nullable: true,
    required: false,
  })
  @IsOptional()
  description: string;

  @ApiProperty({
    nullable: true,
    required: false,
  })
  @IsOptional()
  studioId?: string;
}
