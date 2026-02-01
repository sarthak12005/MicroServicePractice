import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from '@app/common';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          port: process.env.AUTH_SERVICE_PORT,
          host: process.env.AUTH_SERVICE_HOST,
          package: AUTH_PACKAGE_NAME,
          protoPath: './proto/auth.proto',
        },
      },
      // {
      //   name: ORDER_PACKAGE_NAME,
      //   transport: Transport.GRPC,
      //   options: {
      //     port: process.env.ORDER_SERVICE_PORT,
      //     host: process.env.ORDER_SERVICE_HOST,
      //     package: ORDER_PACKAGE_NAME,
      //     protoPath: './proto/order.proto',
      //   },
      // }
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
