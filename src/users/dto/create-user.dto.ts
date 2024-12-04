import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Country } from 'src/enums/countries.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    nullable: true,
    required: false,
  })
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    enum: Country,
  })
  @IsEnum(Country)
  @IsNotEmpty()
  country: string;

  @ApiProperty()
  @IsNotEmpty()
  city: string;
}
