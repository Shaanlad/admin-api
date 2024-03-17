import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';
import { IsEmail } from 'class-validator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async insertUser(createUserDto: CreateUserDto) {
    console.log('<< Inside insertUser >>');

    const newUser = new this.userModel(createUserDto);
    const result = await newUser.save();
    console.log('User Created >> ', result);
    // return result.id as string;
    return result;
  }

  async getUsers() {
    const users = await this.userModel.find().exec();
    console.log('All Users >> ', users);
    return users.map((user) => ({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
    }));
  }

  async getSingleUser(userId: string) {
    if (!userId) {
      return null;
    }
    const user = await this.findUser(userId);
    return {
      id: user.id,
      name: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
    };
  }

  // async getSingleUserbyEmail(email: string) {
  //   const user = await this.findUserByEmail(email);
  //   console.log('Inside getSingleUserbyEmail >> ', user);

  //   return {
  //     id: user.id,
  //     name: user.firstname,
  //     lastname: user.lastname,
  //     email: user.email,
  //     password: user.password,
  //     isAdmin: user.isAdmin,
  //   };
  // }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    console.log(
      'Inside updateUser >> ',
      userId,
      ' updateUserDto >> ',
      updateUserDto,
    );
    const updatedUser = await this.findUser(userId);
    console.log('updatedUser >> ', updatedUser);
    if (updateUserDto.firstname) {
      updatedUser.firstname = updateUserDto.firstname;
    }
    if (updateUserDto.lastname) {
      updatedUser.lastname = updateUserDto.lastname;
    }
    if (updateUserDto.email) {
      updatedUser.email = updateUserDto.email;
    }
    if (updateUserDto.password) {
      updatedUser.password = updateUserDto.password;
    }
    if (updateUserDto.isAdmin) {
      updatedUser.isAdmin = updateUserDto.isAdmin;
    }
    updatedUser.save();
  }

  async deleteUser(userId: string) {
    const result = await this.userModel.deleteOne({ _id: userId }).exec();
    console.log('Successfully Deleted >> ', result.deletedCount);
    if (result.deletedCount === 0) {
      throw new NotFoundException('Sorry, the user does not exist!');
    }
  }

  private async findUser(id: string): Promise<User> {
    const user = this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('Sorry, unable to find your user!');
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email });
    console.log('users >> ', user);
    return user;

    //user enters email, password
    //search via password
    //if found, allow signin
    //else flag exception
  }
}
