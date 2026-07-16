import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../database/entities/product.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { GetProductDto } from './dtos/get-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async getProduct(dto: GetProductDto) {
    const { name } = dto;
    if (name) {
      const product = await this.productRepository.find({ where: { name } });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return product;
    }
    const products = await this.productRepository.find();
    return products;
  }
  async createProduct(dto: CreateProductDto) {
    const { name, price, description } = dto;
    const product = this.productRepository.create({ name, price, description });
    return this.productRepository.save(product);
  }
  async updateProduct(id: number, dto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.productRepository.update(id, { ...dto });
  }
  async deleteProduct(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Product not found');
    }
    return { message: 'Product deleted successfully' };
  }
}
