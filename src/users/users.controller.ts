import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  Session,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/whoami')
  whoAmI(@Session() session: any) {
    console.log('whoAmI session >> ', session);
    return this.usersService.getSingleUser(session.userId);
  }

  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Session() session: any,
  ) {
    console.log('API Body >> ', createUserDto);
    //await this.usersService.insertUser(createUserDto);
    const user = await this.authService.signup(createUserDto);
    console.log('new user signup >>', user);
    session.userId = user.id;
    return user;
  }

  // @Post('/signup')
  // async createUser(

  //   @Body('firstname') userFirstName: string,
  //   @Body('lastname') userLastName: string,
  //   @Body('email') userEmail: string,
  //   @Body('password') userPassword: string,
  //   @Body('isAdmin') userIsAdmin: boolean,
  // ) {
  //   // const generatedId = await this.usersService.insertUser(
  //   //   userFirstName,
  //   //   userLastName,
  //   //   userEmail,
  //   //   userPassword,
  //   //   userIsAdmin,
  //   // );
  //   // return { id: generatedId };

  //   return this.authService.signup(
  //     userFirstName,
  //     userLastName,
  //     userEmail,
  //     userPassword,
  //     userIsAdmin,
  //   );
  // }

  @Post('/signin')
  async signin(@Body() loginDto: LoginDto, @Session() session: any) {
    const user = await this.authService.signin(loginDto);
    session.userId = user.id;
    return user;
  }

  @Get('/')
  async getAllUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Get('/:id')
  getUser(@Param('id') userId: string) {
    return this.usersService.getSingleUser(userId);
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') userId: string,
    @Body('firstname') userFirstName: string,
    @Body('lastname') userLastName: string,
    @Body('email') userEmail: string,
    @Body('email') userPassword: string,
    @Body('isAdmin') userIsAdmin: boolean,
  ) {
    await this.usersService.updateUser(
      userId,
      userFirstName,
      userLastName,
      userEmail,
      userPassword,
      userIsAdmin,
    );
    return null;
  }

  @Delete('/:id')
  async removeUser(@Param('id') userId: string) {
    await this.usersService.deleteUser(userId);
    return null;
  }
}
