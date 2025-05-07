import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional } from 'class-validator';
import { Country } from 'src/enums/countries.enum';

export class UpdateUserDto {
  @ApiProperty({
    nullable: true,
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    nullable: true,
    required: false,
  })
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    nullable: true,
    required: false,
  })
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    enum: Country,
    nullable: true,
    required: false,
  })
  @IsEnum(Country)
  @IsOptional()
  country?: string;

  @ApiProperty({
    nullable: true,
    required: false,
  })
  @IsOptional()
  city?: string;
}
