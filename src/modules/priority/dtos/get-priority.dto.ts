import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetPriorityDto {
  @ApiPropertyOptional({ description: 'search', example: 'ABC' })
  @IsOptional()
  @IsString()
  name?: string;
}
