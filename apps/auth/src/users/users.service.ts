import {
  UsersServiceClient,
  CreateUserDto,
  UpdateUserDto,
  UserResponse,
  PaginationDto,
  UsersResponse,
} from '@app/common';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Observable } from 'rxjs';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

  constructor(
     @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserResponse> {
    
    const emailExists = await this.userModel.findOne({ email: createUserDto.email });
    if (emailExists) {
      throw new Error('Email already exists');
    }

    const mobileExists = await this.userModel.findOne({ mobile: createUserDto.mobile });
    if (mobileExists) {
      throw new Error('Mobile number already exists');
    }

    const newUser = new this.userModel(createUserDto);

    const savedUser = await newUser.save();
    const userObject = savedUser.toObject();

    return {
      _id: savedUser._id.toString(),
      name: userObject.name,
      username: userObject.username,
      email: userObject.email,
      password: userObject.password,
      mobile: userObject.mobile,
      city: userObject.city,
      state: userObject.state,
      district: userObject.district,
      village: userObject.village,
      pincode: userObject.pincode,
      role: userObject.role,
    };
  }

  async findAllUsers(): Promise<UsersResponse> {
    const users = await this.userModel.find().exec();
    
    return {
      users: users.map(user => ({
        _id: user._id.toString(),
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        mobile: user.mobile,
        city: user.city,
        state: user.state,
        district: user.district,
        village: user.village,
        pincode: user.pincode,
        role: user.role,
      }))
    };
  }

  async findOneUser(id: string): Promise<UserResponse> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    return {
      _id: user._id.toString(),
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
      mobile: user.mobile,
      city: user.city,
      state: user.state,
      district: user.district,
      village: user.village,
      pincode: user.pincode,
      role: user.role,
    };
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<UserResponse> {
    const { _id, ...updateData } = updateUserDto;
    
    const updatedUser = await this.userModel.findByIdAndUpdate(
      _id,
      updateData,
      { new: true }
    ).exec();

    if (!updatedUser) {
      throw new Error(`User with id ${_id} not found`);
    }

    return {
      _id: updatedUser._id.toString(),
      name: updatedUser.name,
      username: updatedUser.username,
      email: updatedUser.email,
      password: updatedUser.password,
      mobile: updatedUser.mobile,
      city: updatedUser.city,
      state: updatedUser.state,
      district: updatedUser.district,
      village: updatedUser.village,
      pincode: updatedUser.pincode,
      role: updatedUser.role,
    };
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new Error(`User with id ${id} not found`);
    }
  }

  queryUsers(request: Observable<PaginationDto>): Observable<UsersResponse> {
    return new Observable((observer) => {
      request.subscribe({
        next: async (pagination) => {
          const { page, limit } = pagination;
          const skip = (page - 1) * limit;
          
          const users = await this.userModel.find().skip(skip).limit(limit).exec();
          
          observer.next({
            users: users.map(user => ({
              _id: user._id.toString(),
              name: user.name,
              username: user.username,
              email: user.email,
              password: user.password,
              mobile: user.mobile,
              city: user.city,
              state: user.state,
              district: user.district,
              village: user.village,
              pincode: user.pincode,
              role: user.role,
            }))
          });
        },
        error: (err) => observer.error(err),
        complete: () => observer.complete(),
      });
    });
  }
}
