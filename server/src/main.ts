import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import rawBodyMiddleware from './middlewares/rawBody.middleware';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(rawBodyMiddleware());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.CLIENT_ENDPOINT,
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(8000);
}
bootstrap();
