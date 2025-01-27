import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskCategoryDto } from './dto/create-task_category.dto';
import { UpdateTaskCategoryDto } from './dto/update-task_category.dto';
import { Repository } from 'typeorm';
import { TaskCategory } from './entities/task_category.entity';
import { Task } from 'src/task/entities/task.entity';
import { Category } from 'src/categories/entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskCategoryService {
  constructor(
    @InjectRepository(TaskCategory)
    private readonly taskCategoryRepository : Repository<TaskCategory>,
    @InjectRepository(Task)
    private readonly taskRepository : Repository<Task>,
    @InjectRepository(Category)
    private readonly categoryRepository : Repository<Category>
  ){}
  
  async addTaskToCategory(createTaskCategoryDto : CreateTaskCategoryDto){
    const task = await this.taskRepository.findOneBy({taskId : createTaskCategoryDto.taskId});
    const category = await this.categoryRepository.findOneBy({categoryId : createTaskCategoryDto.categoryId});
    if (!task || !category){
      throw new NotFoundException("Task or Category not found");
    }
    const taskCategory = this.taskCategoryRepository.create({task,category});
    return this.taskCategoryRepository.save(taskCategory);
  }

  async getTasksByCategory(category_id : number){
    const taskCategories = await this.taskCategoryRepository.find({
      where : { category: {categoryId : category_id}},
      relations: ['task']
    });
    return taskCategories.map((tc) => tc.task);
  }

  async getCategoriesByTask(task_id : number){
    const taskCategories = await this.taskCategoryRepository.find({
      where : {task : {taskId : task_id}},
      relations : ['category']
    })
    return taskCategories.map((tc) => tc.category);
  }

  remove(id: number) {
    return this.taskCategoryRepository.delete(id);
  }
}
