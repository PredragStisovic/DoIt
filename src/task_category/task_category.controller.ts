import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TaskCategoryService } from './task_category.service';
import { CreateTaskCategoryDto } from './dto/create-task_category.dto';
import { UpdateTaskCategoryDto } from './dto/update-task_category.dto';
import { JWTAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('task-category')
@UseGuards(JWTAuthGuard)
export class TaskCategoryController {
  constructor(private readonly taskCategoryService: TaskCategoryService) {}

  @Post()
  create(@Body() createTaskCategoryDto: CreateTaskCategoryDto) {
    return this.taskCategoryService.addTaskToCategory(createTaskCategoryDto);
  }

  @Get('category/:id')
  findAll(@Param('id') categoryId: string) {
    return this.taskCategoryService.getTasksByCategory(+categoryId);
  }

  @Get('task/:id')
  findOne(@Param('id') taskId: string) {
    return this.taskCategoryService.getCategoriesByTask(+taskId);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskCategoryService.remove(+id);
  }
}
