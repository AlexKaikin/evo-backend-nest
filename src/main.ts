import { NestFactory } from '@nestjs/core'
//import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // const config = new DocumentBuilder()
  //   .setTitle('EVO PLACE')
  //   .setDescription('API')
  //   .setVersion('1.0')
  //   .build()
  // const document = SwaggerModule.createDocument(app, config)
  // SwaggerModule.setup('api', app, document)

  app.enableCors()
  await app.listen(process.env.PORT)
}

bootstrap()
