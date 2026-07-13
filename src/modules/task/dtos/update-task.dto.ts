import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateTaskDto {
  @ApiPropertyOptional({ description: 'title', example: 'ABC' })
  @IsOptional()
  title?: string;
  @ApiPropertyOptional({ description: 'description', example: '123' })
  @IsOptional()
  description?: string;
  @ApiPropertyOptional({ description: 'completed', example: true })
  @IsOptional()
  completed?: boolean;
}
