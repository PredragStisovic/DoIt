import { Module } from '@nestjs/common';
import { TaskCategoryService } from './task_category.service';
import { TaskCategoryController } from './task_category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskCategory } from './entities/task_category.entity';
import { TaskModule } from 'src/task/task.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { Category } from 'src/categories/entities/category.entity';
import { Task } from 'src/task/entities/task.entity';

@Module({
  imports : [TypeOrmModule.forFeature([TaskCategory, Task, Category]), TaskModule, CategoriesModule],
  controllers: [TaskCategoryController],
  providers: [TaskCategoryService],
})
export class TaskCategoryModule {}
