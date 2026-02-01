import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersServiceController, CreateUserDto, UpdateUserDto, UsersServiceControllerMethods, FindOneUserDto, Empty, PaginationDto, UsersResponse } from '@app/common';
import { Observable } from 'rxjs';

@Controller('/users')
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
  constructor(private readonly usersService: UsersService) {}

  createUser( createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  findOneUser( findOneUserDto: FindOneUserDto) {
    return this.usersService.findOneUser(findOneUserDto._id);
  }

  updateUser(updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(updateUserDto);
  }

  deleteUser(findOneUserDto: FindOneUserDto ) {
    return this.usersService.deleteUser(findOneUserDto._id);
  }

  queryUsers(request: Observable<PaginationDto>): Observable<UsersResponse> {
    return this.usersService.queryUsers(request);
  }
}
