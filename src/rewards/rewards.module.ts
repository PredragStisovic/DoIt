import { Module } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { RewardsController } from './rewards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reward } from './entities/reward.entity';
import { PointsModule } from 'src/points/points.module';
import { TransactionsModule } from 'src/transactions/transactions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reward]), PointsModule, TransactionsModule],
  providers: [RewardsService],
  controllers: [RewardsController]
})
export class RewardsModule {}
