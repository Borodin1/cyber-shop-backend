import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as CookieParcer from 'cookie-parser'
import * as process from "process"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: process.env.ORIGIN
  })
  app.use(CookieParcer())
  await app.listen(process.env.PORT);
}
bootstrap();
