import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import * as dotenv from 'dotenv'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProductsModule } from './products/products.module'
import { UsersModule } from './users/users.module'
dotenv.config()

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UsersModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
