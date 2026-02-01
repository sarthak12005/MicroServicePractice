import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.API_GATEWAY_PORT || 3000);
  console.log(`API Gateway is running on: ${process.env.API_GATEWAY_PORT}`);
}
bootstrap();
