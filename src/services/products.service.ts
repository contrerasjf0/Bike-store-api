import { Injectable } from '@nestjs/common';

import { Product } from './../entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'bla bla',
      price: 122,
      image: '',
      stock: 12,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product) 
      throw new NotFoundException(`Product #${id} not found`);
    
    return product;
  }

  create(payload: Product) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: Product){
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
  }
}
