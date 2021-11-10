import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './../entities/product.entity';
import { BrandsService } from './brands.service';
import { CreateProductDto, UpdateProductDto} from '../dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private brandsService: BrandsService
  ) {}

  findAll() {
    return this.productRepo.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne(id);
    if (!product) 
      throw new NotFoundException(`Product #${id} not found`);
    
    return product;
  }

  async create(payload: CreateProductDto) {
    // const newProduct = new Product();
    // newProduct.image = data.image;
    // newProduct.name = data.name;
    // newProduct.description = data.description;
    // newProduct.price = data.price;
    // newProduct.stock = data.stock;
    // newProduct.image = data.image;
    const newProduct = this.productRepo.create(payload);
    if (payload.brandId) {
      const brand = await this.brandsService.findOne(payload.brandId);
      newProduct.brand = brand;
    }
    return this.productRepo.save(newProduct);
  }

  async update(id: number, payload: UpdateProductDto){
    const product = await this.productRepo.findOne(id);
    if (payload.brandId) {
      const brand = await this.brandsService.findOne(payload.brandId);
      product.brand = brand;
    }
    this.productRepo.merge(product, payload);
    return this.productRepo.save(product);
  }

  delete(id: number){
    return this.productRepo.delete(id);
  }
}
