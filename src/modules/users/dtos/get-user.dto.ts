import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetUserDto {
  @ApiPropertyOptional({
    description: 'The username of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiPropertyOptional({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  @IsString()
  @IsOptional()
  email?: string;
}
