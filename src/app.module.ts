import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'
import * as dotenv from 'dotenv'
import { AccountModule } from './account/account.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BlogModule } from './blog/blog.module'
import { ClubModule } from './club/club.module'
import { NavigationModule } from './navigation/navigation.module'
import { ShopModule } from './shop/shop.module'
import { SocketsModule } from './sockets/sockets.module'
dotenv.config()

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AccountModule,
    ShopModule,
    BlogModule,
    ClubModule,
    NavigationModule,
    SocketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
