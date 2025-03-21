import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  
@Get(':id')
findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
  return this.productsService.findOne(id);
}
  
@Get('provider/:providerId')
findbyprovider(@Param('providerId', new ParseUUIDPipe({ version: '4' })) providerId: string) {
  return this.productsService.findbyprovider(providerId);
}
  @Patch(':productid')
  update(@Param('productid') productid: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(productid, updateProductDto);
  }

  @Delete(':productid')
  remove(@Param('productid') productid: string) {
    return this.productsService.remove(productid);
  }
}
