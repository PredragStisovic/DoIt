import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { UserModule } from 'src/user/user.module';
import { PointsModule } from 'src/points/points.module';

@Module({
  imports : [TypeOrmModule.forFeature([Task]), UserModule, PointsModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
