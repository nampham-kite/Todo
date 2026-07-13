import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetTaskDto {
  @ApiPropertyOptional({ description: 'search', example: 'ABC' })
  @IsOptional()
  search?: string;
}
