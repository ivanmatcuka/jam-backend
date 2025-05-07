import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateEquipmentTypeDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
