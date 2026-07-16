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
import { DeleteResult, UpdateResult } from 'typeorm';
import { Task } from '../../database/entities/task.entity';
import { AssignTaskDto } from './dtos/assign.dtot';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTaskDto } from './dtos/get-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TaskService } from './task.service';
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getTasks(@Query() dto: GetTaskDto): Promise<Task[]> {
    const result = await this.taskService.getTasks(dto);
    console.log(result);
    return result;
  }
  @Post()
  async createTask(@Body() dto: CreateTaskDto): Promise<Task> {
    const result = await this.taskService.createTask(dto);
    return result;
  }
  @Put(':id')
  async updateTask(
    @Param('id') id: number,
    @Body() dto: UpdateTaskDto,
  ): Promise<UpdateResult> {
    const result = await this.taskService.updateTask(id, dto);
    return result;
  }
  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<DeleteResult> {
    const result = await this.taskService.deleteTask(id);
    return result;
  }
  @Put(':id/assign')
  async assignTask(
    @Param('id') id: number,
    @Body() dto: AssignTaskDto,
  ): Promise<UpdateResult> {
    const result = await this.taskService.assignTask(id, dto);
    return result;
  }
}
