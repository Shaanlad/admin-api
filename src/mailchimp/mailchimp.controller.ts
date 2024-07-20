import { Controller, Post, Body } from '@nestjs/common';
import { MailchimpService } from './mailchimp.service';

@Controller('mailchimp')
export class MailchimpController {
  constructor(private mailchimpService: MailchimpService) {}

  @Post('send-notification')
  async sendNotification(
    @Body('email') email: string,
    @Body('subject') subject: string,
    @Body('message') message: string,
  ) {
    return await this.mailchimpService.sendNotification(
      email,
      subject,
      message,
    );
  }
}
