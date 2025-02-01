import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { PointsService } from 'src/points/points.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository : Repository<Task>,
    private readonly pointsService : PointsService,
    private readonly dataSource : DataSource
  ){}
  create(createTaskDto: CreateTaskDto, user : User) {
    const task = new Task();
    task.title = createTaskDto.title
    task.description = createTaskDto.description
    task.completed = false;
    task.createdAt = new Date();
    task.points = createTaskDto.points
    task.dueDate = createTaskDto.dueDate
    task.user = user;
    return this.taskRepository.save(task);
  }

  async findAll(req_user : User) {
    return this.taskRepository.find({
      relations : {
        user : true
      },
      where: {
        user : {
          userId : req_user.userId
        }
      }
    });
  }

  findOne(id: number) {
    return this.taskRepository.findOneBy({taskId : id});
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOneBy({taskId:id});
    if(updateTaskDto.description != null){
      task.description = updateTaskDto.description
    }
    if(updateTaskDto.title != null){
      task.title = updateTaskDto.title
    }
    if(updateTaskDto.points != null){
      task.points = updateTaskDto.points
    }
    return this.taskRepository.save(task)
  }

  async completeTask(id : number, user : User){
    const task = await this.taskRepository.findOneBy({taskId : id});
    if(task.completed == true){
      return "Task already completed";
    }
    task.completed = true;
    await this.pointsService.addPoints(task.points, user);
    await this.taskRepository.save(task);
    return await this.pointsService.findUsersPoints(user);
  }

  remove(id: number) {
    this.taskRepository.delete(id);
  }
}
