import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class UpdatePriorityDto {
  @ApiPropertyOptional({ description: 'name', example: 'ABC' })
  @IsOptional()
  @IsString()
  name?: string;
}
