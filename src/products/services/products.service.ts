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

  findOne(id: number) {
    const product = this.productRepo.findOne(id);
    if (!product) 
      throw new NotFoundException(`Product #${id} not found`);
    
    return product;
  }

  /* create(payload: CreateProductDto) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDto){
    const index = this.products.findIndex((item) => item.id === id)
    const product = this.findOne(id)

    const productChanges = {
      ...product,
      ...payload,
    }

    this.products.splice(index, 1, productChanges)

    return productChanges
  }

  delete(id: number){
    const index = this.products.findIndex((item) => item.id === id)
    const product = this.findOne(id)
    this.products.splice(index, 1)

    return product
  } */
}
