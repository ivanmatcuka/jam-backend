import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
