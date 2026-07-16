import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserDto } from './dtos/get-user.dto';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getUsers(@Query() dto: GetUserDto) {
    const users = await this.userService.getUsers(dto);
    return users;
  }
  @Post('')
  async createUser(@Body() dto: CreateUserDto) {
    const user = await this.userService.createUser(dto);
    return user;
  }
  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    const user = await this.userService.updateUser(id, dto);
    return user;
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    const user = await this.userService.deleteUser(id);
    return user;
  }
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const token = await this.userService.login(dto);
    return token;
  }
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const user = await this.userService.register(dto);
    return user;
  }
}
