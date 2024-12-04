import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { Country } from 'src/enums/countries.enum';

export class CreateStudioDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  coordinates: string;

  @ApiProperty({
    enum: Country,
  })
  @IsEnum(Country)
  @IsNotEmpty()
  country: string;

  @ApiProperty()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  booking?: string;
}
