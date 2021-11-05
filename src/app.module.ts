import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { BrandsController } from './controllers/brands.controller';
import { CustomersController } from './controller/customers.controller';
import { UsersController } from './controller/users.controller';
import { BrandsService } from './services/brands.service';
import { CategoriesService } from './services/categories.service';
import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [],
  controllers: [AppController, CategoriesController, ProductsController, BrandsController, CustomersController, UsersController],
  providers: [AppService, ProductsService, BrandsService, CategoriesService, CustomersService, UsersService],
})
export class AppModule {}
