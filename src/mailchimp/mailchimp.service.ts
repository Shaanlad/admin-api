import { Injectable, Logger } from '@nestjs/common';
import * as Mailchimp from '@mailchimp/mailchimp_transactional';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailchimpService {
  private mailchimpClient;
  private readonly logger = new Logger(MailchimpService.name);

  constructor(private configService: ConfigService) {
    this.mailchimpClient = Mailchimp(
      this.configService.get<string>(process.env.MAILCHIMP_API_KEY),
    );
  }

  async sendNotification(email: string, subject: string, message: string) {
    try {
      const response = await this.mailchimpClient.messages.send({
        message: {
          from_email: 'shaan.lad@gmail.com',
          subject: subject,
          text: message,
          to: [
            {
              email: email,
              type: 'to',
            },
          ],
        },
      });
      this.logger.log(`Email sent successfully: ${response}`);
      return response;
    } catch (error) {
      this.logger.error(`Error sending email: ${error.message}`, error.stack);
      if (error.response) {
        this.logger.error(
          `Mailchimp response: ${JSON.stringify(error.response.data)}`,
        );
      }
      throw error;
    }
  }

  // Add other Mailchimp-related methods here
}
