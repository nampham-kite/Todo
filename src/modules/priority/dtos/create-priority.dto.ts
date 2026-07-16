import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreatePriorityDto {
  @ApiProperty({ description: 'name', example: 'ABC' })
  @IsString()
  name!: string;
}
