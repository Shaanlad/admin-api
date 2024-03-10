import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';

//const adminDBPass = encodeURIComponent('Helios#Aim24*');

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb+srv://adminDBUser:Test123vSL@atlascluster.cnzcjfg.mongodb.net/allpoint-apis?retryWrites=true&w=majority&appName=AtlasCluster'
      ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
