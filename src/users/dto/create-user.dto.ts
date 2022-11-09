import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Country } from 'src/countries.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    nullable: true,
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
