import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { GrpcToHttpExceptionFilter } from '@app/common/filters/grpcErrorFilter';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const loger = new Logger('ApiGateway');
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GrpcToHttpExceptionFilter());

  await app.listen(process.env.API_GATEWAY_PORT || 3000);
  loger.log(`API Gateway is running on: http://localhost:${process.env.API_GATEWAY_PORT}`);
}
bootstrap();
