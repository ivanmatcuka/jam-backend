import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsPhoneNumber } from 'class-validator';
import { Country } from 'src/enums/countries.enum';

export class UpdateStudioDto {
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
  name?: string;

  @ApiProperty({
    nullable: true,
    required: false,
  })
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    nullable: true,
    required: false,
  })
  @IsOptional()
  coordinates?: string;

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

  @ApiProperty({
    nullable: true,
    required: false,
  })
  @IsOptional()
  userId?: string;
}
