import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/jwt-auth.guard';
import { PointsService } from './points.service';

@UseGuards(JWTAuthGuard)
@Controller('points')
export class PointsController {
    constructor(
        private readonly pointsService : PointsService
    ){}
    @Get()
    findUsersPoints(@Request() req){
        return this.pointsService.findUsersPoints(req.user);
    }
}
