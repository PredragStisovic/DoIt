import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JWTAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from 'src/user/user.service';

@UseGuards(JWTAuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService,
    private readonly userService : UserService
  ) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    const task = await this.taskService.create(createTaskDto, req.user);
    return task;
  }

  @Get()
  findAll(@Request() req) {
    return this.taskService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
