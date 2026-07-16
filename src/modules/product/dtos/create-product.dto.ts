import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Product 1',
  })
  @IsNotEmpty()
  @IsString()
  name!: string;
  @ApiProperty({
    description: 'The price of the product',
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price!: number;
  @ApiProperty({
    description: 'The description of the product',
    example: 'This is a product description',
  })
  @IsNotEmpty()
  @IsString()
  description!: string;
}
