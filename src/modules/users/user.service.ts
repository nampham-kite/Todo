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
      });
      return result;
    }
    if (email) {
      const result = await this.userRepository.find({
        where: {
          email: Like(`%${email}%`),
        },
      });
      return result;
    }

    const users = await this.userRepository.find({});
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
}
