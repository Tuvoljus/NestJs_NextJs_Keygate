import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

console.log('Main.tsEnv:_PUBLIC_FRONTEND_URL', process.env.PUBLIC_FRONTEND_URL);

  app.enableCors({
    origin: process.env.PUBLIC_FRONTEND_URL || 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization'
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
