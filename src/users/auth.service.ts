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
import { UpdateUserDto } from './dtos/update-user.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(createUserDto: CreateUserDto) {
    console.log('<< Inside signup >> ');

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
      throw new BadRequestException('Incorrect password!');
    }
    return user;
  }

  async updateAuthUser(userId: string, updateUserDto: UpdateUserDto) {
    console.log('<< Inside updateAuthUser >> ');

    //generate salt
    // const salt = randomBytes(8).toString('hex');
    // //hash the salt and password together
    // const hash = (await scrypt(updateUserDto.password, salt, 32)) as Buffer;
    // //join the hashed result and salt together
    // const result = salt + '.' + hash.toString('hex');
    updateUserDto['password'] = await this.passwordHashingMech(
      updateUserDto.password,
    );
    console.log('Hashed Password >> ', updateUserDto.password);
    //update the user and save it
    const user = await this.usersService.updateUser(userId, updateUserDto);

    //return the user
    console.log('Auth User Updated >> ', user);
    return user;
  }

  async passwordHashingMech(dtoPassword: string) {
    //generate salt
    const salt = randomBytes(8).toString('hex');
    //hash the salt and password together
    const hash = (await scrypt(dtoPassword, salt, 32)) as Buffer;
    //join the hashed result and salt together
    const result = salt + '.' + hash.toString('hex');
    return result;
  }
}
