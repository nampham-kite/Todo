import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetProductDto {
  @ApiPropertyOptional({ description: 'name', example: 'ABC' })
  @IsOptional()
  @IsString()
  name?: string;
}
