import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class AssignTaskDto {
  @ApiProperty({
    description: 'The id of the user',
    example: 1,
  })
  @IsNotEmpty()
  userId!: number;
}
