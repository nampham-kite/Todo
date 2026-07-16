import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Priority } from '../../database/entities/priority.entity';
import { Task } from '../../database/entities/task.entity';
import { User } from '../../database/entities/user.entity';
import { AssignTaskDto } from './dtos/assign.dtot';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTaskDto } from './dtos/get-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Priority)
    private readonly priorityRepository: Repository<Priority>,
  ) {}
  async getTasks(dto: GetTaskDto): Promise<Task[]> {
    const userId = dto.userId;
    if (userId) {
      const result = await this.taskRepository.find({
        where: { user: { id: userId } },
        relations: { user: true },
      });
      return result;
    } else {
      const result = await this.taskRepository.find({
        where: { title: Like(`%${dto.search}%`) },
        relations: { user: true },
      });
      return result;
    }
  }
  async createTask(dto: CreateTaskDto) {
    const priority = await this.priorityRepository.findOne({
      where: { id: dto.priorityId },
    });
    if (!priority) {
      throw new NotFoundException('Khong tim thay');
    }
    const result = await this.taskRepository.create({
      ...dto,
      priority: priority,
    });
    return this.taskRepository.save(result);
  }
  async updateTask(id: number, dto: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('Khong tim thay');
    }
    const result = await this.taskRepository.update(id, dto);
    return result;
  }
  async deleteTask(id: number) {
    if (!(await this.taskRepository.findOne({ where: { id } }))) {
      throw new NotFoundException('Khong tim thay');
    }
    return await this.taskRepository.delete(id);
  }
  async assignTask(id: number, dto: AssignTaskDto) {
    const userId = dto.userId;
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('Khong tim thay');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Khong tim thay');
    }
    const result = await this.taskRepository.update(id, {
      user: { id: dto.userId },
    });
    return result;
  }
}
