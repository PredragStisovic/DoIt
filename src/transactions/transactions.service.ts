import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RewardTransaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Reward } from 'src/rewards/entities/reward.entity';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(RewardTransaction)
        private readonly transactionRepository : Repository<RewardTransaction>
    ){}
    create(pointsSpent : number, user : User, reward : Reward){
        const rewardTransaction = new RewardTransaction();
        rewardTransaction.points_spent = pointsSpent;
        rewardTransaction.reward= reward;
        rewardTransaction.user = user;
        return this.transactionRepository.save(rewardTransaction);
    }
    findUsersTransactions(req_user: User){
        return this.transactionRepository.findOneBy({user : req_user})
    }
    
}
