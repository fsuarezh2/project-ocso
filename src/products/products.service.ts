import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {v4 as uuid} from "uuid";
import { error } from 'console';

@Injectable()
export class ProductsService {
  private products: CreateProductDto[]=[
    {
      productid: uuid(),
      productname: "Sabritas",
      price: 50,
      countseal: 3,
      provider: uuid()
    },
    {
      productid: uuid(),
      productname: "Jumex",
      price: 30,
      countseal: 5,
      provider: uuid()
    },
    {
      productid: uuid(),
      productname: "Chela",
      price: 65,
      countseal: 8,
      provider: uuid()
    }
  ]
  create(createProductDto: CreateProductDto) {
    createProductDto.productid=uuid();
    this.products.push(createProductDto);
    return createProductDto;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
   const product = this.products.filter((product)=>product.productid===id)[0];
       if (!product) throw new NotFoundException();
       return product;  
     }
     findbyprovider(providerId: string) {
      const products = this.products.filter((product) => product.provider === providerId);
      if (products.length === 0) throw new NotFoundException;
      return products;
    }
  update(productid: string, updateProductDto: UpdateProductDto) {
    let producttoupdate = this.findOne(productid);
        producttoupdate={
        ...producttoupdate,
        ...updateProductDto,
        }
    
        if(producttoupdate)throw new NotFoundException;
    
        this.products = this.products.map((product)=>{
          if (product.productid == productid){
            product = product
          }
          return product
        })
        return producttoupdate;
      }

  remove(productid: string) {
    this.findOne(productid)
    this.products = this.products.filter((employee)=> employee.productid === productid);
    return this.products
  }
}
