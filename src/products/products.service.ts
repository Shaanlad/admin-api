import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.model';
import { Model } from 'mongoose';
import { UpdatePdtDto } from './dtos/update-products.dto';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(name: string, desc: string, price: number) {
    // const prodId = Math.random().toString();
    const newProduct = new this.productModel({
      name,
      description: desc,
      price,
    });
    const result = await newProduct.save();
    console.log('Product Inserted >> ', result);

    return result.id as string;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map((pdt) => ({
      id: pdt.id,
      name: pdt.name,
      description: pdt.description,
      price: pdt.price,
    }));
  }

  async getSingleProduct(productId: string) {
    const pdt = await this.findPdt(productId);
    return {
      id: pdt.id,
      name: pdt.name,
      description: pdt.description,
      price: pdt.price,
    };
  }

  async updateProduct(productId: string, updatePdtDto: UpdatePdtDto) {
    const updatedPdt = await this.findPdt(productId);
    if (updatePdtDto.name) {
      updatedPdt.name = updatePdtDto.name;
    }
    if (updatePdtDto.description) {
      updatedPdt.description = updatePdtDto.description;
    }
    if (updatePdtDto.price) {
      updatedPdt.price = updatePdtDto.price;
    }
    updatedPdt.save();
  }

  async deleteProduct(prodId: string) {
    const result = await this.productModel.deleteOne({ _id: prodId }).exec();
    console.log('Deleted Product >> ', result.deletedCount);
    if (result.deletedCount === 0) {
      throw new NotFoundException('Sorry, the product does not exist!');
    }
  }

  private async findPdt(id: string): Promise<Product> {
    const pdt = this.productModel.findById(id);
    if (!pdt) {
      throw new NotFoundException(
        "Sorry, the product you're looking for does not exist!",
      );
    }
    return pdt;
  }
}
