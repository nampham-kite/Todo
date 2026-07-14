import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'The password of the user',
    example: 'password',
  })
  @IsString()
  @IsOptional()
  password?: string;
  @ApiPropertyOptional({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;
}
