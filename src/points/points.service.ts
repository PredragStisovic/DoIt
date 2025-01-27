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
}
