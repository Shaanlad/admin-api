import {
    Post,
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';

import Stripe from 'stripe';

@Controller('payment')
export class PaymentsController {
  constructor() {}


}