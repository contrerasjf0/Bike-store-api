import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDto, UpdateProductDto} from '../dtos/products.dto'
import { Product } from './../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>
  ) {}

  findAll() {
    return this.productRepo.find();;
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne(id);
    if (!product) 
      throw new NotFoundException(`Product #${id} not found`);
    
    return product;
  }

  create(payload: CreateProductDto) {
    // const newProduct = new Product();
    // newProduct.image = data.image;
    // newProduct.name = data.name;
    // newProduct.description = data.description;
    // newProduct.price = data.price;
    // newProduct.stock = data.stock;
    // newProduct.image = data.image;
    const newProduct = this.productRepo.create(payload);
    return this.productRepo.save(newProduct);
  }

  update(id: number, payload: UpdateProductDto){
    const product = await this.productRepo.findOne(id);
    this.productRepo.merge(product, payload);
    return this.productRepo.save(product);
  }

  delete(id: number){
    return this.productRepo.delete(id);
  }
}
