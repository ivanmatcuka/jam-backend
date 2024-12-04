import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateInstrumentDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
