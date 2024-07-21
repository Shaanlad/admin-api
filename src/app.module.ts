import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StripeModule } from './stripe/stripe.module';
import { ConfigModule } from '@nestjs/config';
import { MailchimpModule } from './mailchimp/mailchimp.module';
import { EnrollModule } from './enroll/enroll.module';

//const adminDBPass = encodeURIComponent('Helios#Aim24*');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb+srv://adminDBUser:Test123vSL@atlascluster.cnzcjfg.mongodb.net/allpoint-apis?retryWrites=true&w=majority&appName=AtlasCluster',
    ),
    StripeModule,
    MailchimpModule,
    EnrollModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
