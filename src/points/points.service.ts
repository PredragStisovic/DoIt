import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Points } from './entities/points.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PointsService {
    constructor(
        @InjectRepository(Points)
        private readonly pointsRepository : Repository<Points>
    ){}
    async create(user : User){
        const points = new Points();
        points.earned_points = 0;
        points.spent_points = 0;
        points.total_points = 0;
        points.user = user;
        return this.pointsRepository.save(points);
    }
    findUsersPoints(req_user : User){
        return this.pointsRepository.findOneBy({user : req_user})
    }
    async addPoints(points : number, req_user : User){
        const usersPoints = await this.findUsersPoints(req_user);
        usersPoints.total_points += points;
        usersPoints.earned_points += points;
        await this.pointsRepository.save(usersPoints);
    }
    async spendPoints(points : number, req_user : User){
        const usersPoints = await this.findUsersPoints(req_user);
        if(points <= usersPoints.total_points){
            usersPoints.total_points -= points;
            usersPoints.spent_points += points;
            await this.pointsRepository.save(usersPoints);
        }else{
            throw Error("Not enough points");
        }
        return usersPoints;
    }

}
