import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(createUserDto: CreateUserDto) {
    console.log('<< Inside signup >> ');
    //check if email in use
    // const users = await this.usersService.getUsers();
    // console.log('users >> ', users);
    // users.forEach((user) => {
    //   console.log('user email >> ', user.email);
    //   if (user.email === createUserDto.email) {
    //     console.log('email matched');
    //     throw new BadRequestException('email in use!');
    //   }
    // });

    //hash users password process -

    //generate salt
    const salt = randomBytes(8).toString('hex');

    //hash the salt and password together
    const hash = (await scrypt(createUserDto.password, salt, 32)) as Buffer;

    //join the hashed result and salt together
    const result = salt + '.' + hash.toString('hex');
    delete createUserDto.password;
    createUserDto['password'] = result;
    //create new user and save it
    const user = await this.usersService.insertUser(createUserDto);

    //return the user
    console.log('new user created >> ', user);
    return user;
  }

  async signin(loginDto: LoginDto) {
    const user = await this.usersService.findUserByEmail(loginDto.email);
    console.log('User trying to signin >> ', user);
    if (!user) {
      throw new NotFoundException('User not found when searched by email!');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(loginDto.password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('wrong password!');
    }
    return user;
  }
}
