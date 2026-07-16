import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Priority } from '../../database/entities/priority.entity';
import { Task } from '../../database/entities/task.entity';
import { PriorityController } from './priority.controller';
import { PriorityService } from './priority.service';
@Module({
  imports: [TypeOrmModule.forFeature([Priority, Task])],
  controllers: [PriorityController],
  providers: [PriorityService],
})
export class PriorityModule {}
