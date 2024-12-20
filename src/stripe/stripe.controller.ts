import { Body, Controller, Get, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Cart } from './cart.model';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post('/')
  checkout(@Body() body: { cart: Cart }) {
    try {
      return this.stripeService.checkout(body.cart);
    } catch (error) {
      return error;
    }
  }

  @Get('/')
  stripePK() {
    return this.stripeService.stripePK();
  }

  @Post('/create-payment-intent')
  createPymtIntent() {
    return this.stripeService.createPymntIntent();
  }
}
