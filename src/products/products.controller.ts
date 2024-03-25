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
import { UpdatePdtDto } from './dtos/update-products.dto';

@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('/')
  async createPdt(
    @Body('name') pdtName: string,
    @Body('description') pdtDesc: string,
    @Body('price') pdtPrice: number,
  ) {
    const generatedId = await this.productsService.insertProduct(
      pdtName,
      pdtDesc,
      pdtPrice,
    );
    return { id: generatedId };
  }

  @Get('/')
  async getAllPdt() {
    const pdt = await this.productsService.getProducts();
    return pdt;
  }

  @Get('/:id')
  getPdt(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch('/:id')
  async updatePdt(@Param('id') prodId: string, @Body() body: UpdatePdtDto) {
    await this.productsService.updateProduct(prodId, body);
    return null;
  }

  @Delete('/:id')
  async removePdt(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId);
    return null;
  }
}
