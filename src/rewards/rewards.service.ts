import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reward } from './entities/reward.entity';
import { CreateRewardDto } from './dto/create-reward.dto';
import { User } from 'src/user/entities/user.entity';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { PointsService } from 'src/points/points.service';
import { TransactionsService } from 'src/transactions/transactions.service';

@Injectable()
export class RewardsService {
    constructor(
        @InjectRepository(Reward)
        private readonly rewardsRepository : Repository<Reward>,
        private readonly pointsService : PointsService,
        private readonly transactionService : TransactionsService
    ){}
    async create(createRewardDto : CreateRewardDto, req_user : User){
        if(createRewardDto.cost < 0) throw new Error('Cost must be greater than 0');
        const reward = this.rewardsRepository.create(createRewardDto);
        reward.user = req_user;
        return await this.rewardsRepository.save(reward);
    }

    find(req_user : User){
        return this.rewardsRepository.find({
            relations : {
                user : true
            },
            where : {
                user : {
                    userId : req_user.userId
                }
            }
        })
    }

    findOne(id : number){
        return this.rewardsRepository.findOneBy({ rewardId : id });
    }

    async update(id : number, updateRewardDto : UpdateRewardDto){
        const reward = await this.rewardsRepository.findOneBy({rewardId : id});
        if(updateRewardDto.cost != null){
            reward.cost = updateRewardDto.cost
        }
        if(updateRewardDto.description != null){
            reward.description = updateRewardDto.description
        }
        if(updateRewardDto.name != null){
            reward.name != updateRewardDto.name
        }
        return this.rewardsRepository.save(reward);
    }

    async claimReward(id : number, user : User){
        try {
            const reward = await this.findOne(id);
            await this.pointsService.spendPoints(reward.cost, user);
            return this.transactionService.create(reward.cost, user, reward);
        } catch (error) {
            if (error.message === "Not enough points") {
                return { success: false, message: "Not enough points" };
            }
            return { success: false, message: "An error occurred", error: error.message };
        }
    }

    delete(id : number){
        return this.rewardsRepository.delete(id);
    }
}
