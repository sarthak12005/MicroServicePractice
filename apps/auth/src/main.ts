import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from '@app/common';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, 
    {
       transport: Transport.GRPC,
       options: {
          port: process.env.AUTH_SERVICE_PORT,
          host: process.env.AUTH_SERVICE_HOST,
          package: AUTH_PACKAGE_NAME,
          protoPath: './proto/auth.proto',
       }
    }
  );
  await app.listen();
  console.log(`Auth service is running on: ${process.env.AUTH_SERVICE_PORT}`);
}
bootstrap();
