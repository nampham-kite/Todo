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
import { CreatePriorityDto } from './dtos/create-priority.dto';
import { GetPriorityDto } from './dtos/get-priority.dto';
import { UpdatePriorityDto } from './dtos/update-priority.dto';
import { PriorityService } from './priority.service';
@Controller('priority')
export class PriorityController {
  constructor(private readonly priorityService: PriorityService) {}
  @Get()
  async getPriorities(@Query() dto: GetPriorityDto) {
    return this.priorityService.getPriorities(dto);
  }
  @Post()
  async createPriority(@Body() dto: CreatePriorityDto) {
    return this.priorityService.createPriority(dto);
  }
  @Put(':id')
  async updatePriority(
    @Param('id') id: string,
    @Body() dto: UpdatePriorityDto,
  ) {
    return this.priorityService.updatePriority(Number(id), dto);
  }
  @Delete(':id')
  async deletePriority(@Param('id') id: string) {
    return this.priorityService.deletePriority(Number(id));
  }
}
