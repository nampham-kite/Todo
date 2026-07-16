import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Product 1',
  })
  @IsOptional()
  @IsString()
  name?: string;
  @ApiProperty({
    description: 'The price of the product',
    example: 100,
  })
  @IsOptional()
  @IsNumber()
  price?: number;
  @ApiProperty({
    description: 'The description of the product',
    example: 'This is a product description',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
