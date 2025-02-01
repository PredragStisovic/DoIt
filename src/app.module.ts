import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { TaskModule } from './task/task.module';
import { Task } from './task/entities/task.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';
import { TaskCategoryModule } from './task_category/task_category.module';
import { TaskCategory } from './task_category/entities/task_category.entity';
import { NotificationModule } from './notification/notification.module';
import { Notification } from './notification/entities/notification.entity';
import { PointsModule } from './points/points.module';
import { Points } from './points/entities/points.entity';
import { RewardsModule } from './rewards/rewards.module';
import { Reward } from './rewards/entities/reward.entity';
import { TransactionsModule } from './transactions/transactions.module';
import { RewardTransaction } from './transactions/entities/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'ToDoList',
      entities: [User, Task, Category, TaskCategory, Notification, Points, Reward, RewardTransaction],
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    UserModule,
    TaskModule,
    AuthModule,
    CategoriesModule,
    TaskCategoryModule,
    NotificationModule,
    PointsModule,
    RewardsModule,
    TransactionsModule],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
