import { Controller, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ParseIntPipe } from 'src/common/parse-int.pipe';

import { CreateOrderItemDto } from './../dtos/order-item.dto';
import { OrderItemService } from './../services/order-item.service';

@Controller('order-item')
export class OrderItemController {
  constructor(private itemsService: OrderItemService) {}

  @Post()
  create(@Body() payload: CreateOrderItemDto) {
    return this.itemsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateOrderItemDto,
  ) {
    return this.itemsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.remove(+id);
  }
}
