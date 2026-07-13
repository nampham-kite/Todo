import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Task } from '../../database/entities/task.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTaskDto } from './dtos/get-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}
  async getTasks(dto: GetTaskDto): Promise<Task[]> {
    const result = await this.taskRepository.find({
      where: { title: Like(`%${dto.search}%`) },
    });
    return result;
  }
  async createTask(dto: CreateTaskDto) {
    const result = await this.taskRepository.create(dto);
    await this.taskRepository.save(result);
    return result;
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
}
