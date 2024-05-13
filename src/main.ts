import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as CookieParcer from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true
  })
  app.use(CookieParcer())
  await app.listen(5500);
}
bootstrap();
