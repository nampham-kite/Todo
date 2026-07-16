import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { GetProductDto } from './dtos/get-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async getProducts(@Query() dto: GetProductDto) {
    const products = await this.productService.getProduct(dto);
    return products;
  }
  @Post()
  async createProduct(@Body() dto: CreateProductDto) {
    const product = await this.productService.createProduct(dto);
    return product;
  }
  @Put(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ) {
    const product = await this.productService.updateProduct(id, dto);
    return product;
  }
  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productService.deleteProduct(id);
    return product;
  }
}
