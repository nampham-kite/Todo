import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class CreateTaskDto {
  @ApiProperty({ description: 'title', example: 'ABC' })
  @IsNotEmpty()
  title!: string;
  @ApiProperty({ description: 'description', example: '123' })
  @IsNotEmpty()
  description!: string;
  @ApiPropertyOptional({ description: 'completed', example: true })
  @IsOptional()
  completed!: boolean;
  @ApiProperty({ description: 'priorityId', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  priorityId!: number;
}
