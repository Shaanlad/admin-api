import {
  Post,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createPdt(
    @Body('name') pdtName: string,
    @Body('description') pdtDesc: string,
    @Body('price') pdtPrice: number,
  ) {
    // console.log('API Body >> ', body);
    const generatedId = await this.productsService.insertProduct(
      pdtName,
      pdtDesc,
      pdtPrice,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllPdt() {
    const pdt = await this.productsService.getProducts();
    return pdt;
  }

  @Get(':id')
  getPdt(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  async updatePdt(
    @Param('id') prodId: string,
    @Body('name') prodName: string,
    @Body('description') prodDesc: string,
    @Body('price') prodprice: number,
  ) {
    await this.productsService.updateProduct(
      prodId,
      prodName,
      prodDesc,
      prodprice,
    );
    return null;
  }

  @Delete(':id')
  async removePdt(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId);
    return null;
  }
}
