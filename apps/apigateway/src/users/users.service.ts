import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AUTH_PACKAGE_NAME, CreateUserDto, UpdateUserDto, UserResponse, USERS_SERVICE_NAME, UsersServiceClient } from '@app/common';
import * as microservices from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit {
  private usersService: UsersServiceClient;

  constructor(@Inject(AUTH_PACKAGE_NAME) private client: microservices.ClientGrpc) {}

  onModuleInit() {
    this.usersService = this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }
  
  create(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  findAll(){
    return this.usersService.findAllUsers({});
  }

  findOne(id: string) {
    return this.usersService.findOneUser({ _id:id });
  }

  update(updateUserDto: UpdateUserDto){
    return this.usersService.updateUser(updateUserDto);
  }

  remove(id: string) {
    return this.usersService.deleteUser({ _id:id });
  }
}
