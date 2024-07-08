import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsController } from 'src/products/products.controller';
import { UsersService } from 'src/users/users.service';
import { UsersController } from 'src/users/users.controller';
import { Payment, PaymentSchema } from './payment.model';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel('Payment') private readonly paymentModel: Model<Payment>,
  ) {}

  async getCheckoutSession(req: any, resp: any) {
    try {
      const userId = '661c14363cb82c2273d2a07c';
      const productId = '661c25243cb82c2273d2a09e';

      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

      //Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/checkout-success`,
        cancel_url: `${process.env.HOME}`,
        customer_email: 'test@test.com',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              unit_amount: 13.99,
              product_data: {
                name: 'Free Weekend Nights',
              },
            },
            quantity: 1,
          },
        ],
      });

      //Make payment
      const payment = new this.paymentModel({
        firstname: 'Test',
        lastname: 'User',
        email: 'test@test.com',
        amount: 13.99,
        session: session.id,
      });

      console.log('payment >> ', payment);
      await payment.save();

      console.log('Payment success before');
      resp.status(200).json({
        success: true,
        message: 'Payment Successful',
        session,
      });
      console.log('Payment success after');
    } catch (err) {
      console.log('Error');
    }
  }
}
