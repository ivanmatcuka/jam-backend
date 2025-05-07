import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateGenreDto {
  @ApiProperty()
  @IsOptional()
  name: string;
}
