import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
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
}
