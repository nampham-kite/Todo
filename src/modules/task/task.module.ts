
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Priority } from '../../database/entities/priority.entity';
import { Task } from '../../database/entities/task.entity';
import { User } from '../../database/entities/user.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
@Module({
  imports: [TypeOrmModule.forFeature([Task, User, Priority])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
