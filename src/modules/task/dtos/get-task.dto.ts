import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class GetTaskDto {
  @ApiPropertyOptional({ description: 'search', example: 'ABC' })
  @IsOptional()
  search?: string;
  @ApiPropertyOptional({ description: 'user_id', example: 1 })
  @IsOptional()
  @IsNumber()
  userId?: number;
}
