import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateInstrumentDto {
  @ApiProperty({
    nullable: true,
  })
  @IsOptional()
  name?: string;
}
