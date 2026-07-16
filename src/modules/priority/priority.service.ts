import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Priority } from '../../database/entities/priority.entity';
import { CreatePriorityDto } from './dtos/create-priority.dto';
import { GetPriorityDto } from './dtos/get-priority.dto';
import { UpdatePriorityDto } from './dtos/update-priority.dto';
@Injectable()
export class PriorityService {
  constructor(
    @InjectRepository(Priority)
    private readonly priorityRepository: Repository<Priority>,
  ) {}
  async getPriorities(dto: GetPriorityDto) {
    const name = dto.name;
    if (name) {
      return this.priorityRepository.find({ where: { name } });
    } else {
      return this.priorityRepository.find({});
    }
  }
  async createPriority(dto: CreatePriorityDto) {
    const result = await this.priorityRepository.create(dto);
    return this.priorityRepository.save(result);
  }
  async updatePriority(id: number, dto: UpdatePriorityDto) {
    const priority = await this.priorityRepository.findOne({ where: { id } });
    if (!priority) {
      throw new NotFoundException('Priority not found');
    }

    const result = await this.priorityRepository.update(id, { name: dto.name });
    return result;
  }
  async deletePriority(id: number) {
    const priority = await this.priorityRepository.findOne({ where: { id } });
    if (!priority) {
      throw new NotFoundException('Priority not found');
    }
    return this.priorityRepository.delete(id);
  }
}
