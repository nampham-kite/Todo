import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from '../../database/entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserDto } from './dtos/get-user.dto';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async getUsers(dto: GetUserDto) {
    const username = dto.username;
    const email = dto.email;
    if (username) {
      const result = await this.userRepository.find({
        where: {
          username: Like(`%${username}%`),
        },
        relations: { tasks: true },
      });
      return result;
    }
    if (email) {
      const result = await this.userRepository.find({
        where: {
          email: Like(`%${email}%`),
        },
        relations: { tasks: true },
      });
      return result;
    }

    const users = await this.userRepository.find({
      relations: { tasks: true },
    });
    return users;
  }
  async createUser(dto: CreateUserDto) {
    const username = dto.username;
    const checkUser = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });
    if (checkUser) {
      throw new BadRequestException('User already exists');
    }
    const user = this.userRepository.create(dto);
    return this.userRepository.save(user);
  }
  async updateUser(id: number, dto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const updateUser = this.userRepository.merge(user, dto);
    return this.userRepository.save(updateUser);
  }
  async deleteUser(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete({ id: id });
    return { message: 'User deleted successfully' };
  }
  async login(dto: LoginDto) {
    const username = dto.username;
    const password = dto.password;
    const user = await this.userRepository.findOne({
      where: {
        username: username,
        password: password,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { message: 'Login successful' };
  }
  async register(dto: RegisterDto) {
    const username = dto.username;
    const password = dto.password;
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });
    if (user) {
      throw new BadRequestException('Tai khoan da ton tai');
    }
    const newUser = this.userRepository.create({
      username: username,
      password: password,
    });
    return this.userRepository.save(newUser);
  }
}
