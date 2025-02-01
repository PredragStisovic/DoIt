import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RewardTransaction } from './entities/transaction.entity';

@Module({
  imports : [TypeOrmModule.forFeature([RewardTransaction])],
  providers: [TransactionsService],
  controllers: [TransactionsController],
  exports : [TransactionsService]
})
export class TransactionsModule {}
