import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class AppService {
  // getHello(): string {
  //   return 'Hello World!';
  // }
  async getStripe() {
    console.log('<< Inside Stripe mtd >>');
    const stripe = new Stripe('sk_test_VKmkjIPRGil3BIcZHMsxD4mE00gvBDlJwt');
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1PakUzKXL7CGoBg53AUdpoan',
          quantity: 2,
        },
      ],
      mode: 'payment',
      customer: 'cus_QRdp6Au9DU2qXA',
      success_url: 'http://localhost:3000/success',
      // +
      // '/pay/success/checkout/session?sessions_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3030' + '/pay/failed/checkout/session',
    });

    console.log('<< Returning sessions >> ');
    return session;
  }

  async SuccessSession(Session) {
    console.log('Success sessions >> ', Session);
  }
}
