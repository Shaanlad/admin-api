import { Injectable } from '@nestjs/common';

import Stripe from 'stripe';
import { Cart } from './cart.model';

@Injectable()
export class StripeService {
  private stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    });
  }

  checkout(cart: Cart) {
    const totalPrice = cart.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0,
    );

    return this.stripe.paymentIntents.create({
      amount: +totalPrice.toFixed(2) * 100, //cents
      currency: 'usd', //currency
      payment_method_types: ['card'],
    });
  }

  stripePK() {
    return { publishableKey: process.env.STRIPE_PUBLISHABLE_KEY };
  }

  async createPymntIntent() {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: 1000, //cents
        currency: 'usd', //currency
        automatic_payment_methods: {
          enabled: true,
        },
      });
      return { status: 201, clientSecret: paymentIntent.client_secret };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }
}
