import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Request, UseGuards } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { JWTAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';

@UseGuards(JWTAuthGuard)
@Controller('rewards')
export class RewardsController {
    constructor(
        private readonly rewardsService : RewardsService
    ){}
    @Get()
    findAll(@Request() req){
        return this.rewardsService.find(req.user);
    }

    @Get(':id')
    findOne(@Param('id') id : string){
        return this.rewardsService.findOne(+id);
    }

    @Post()
    create(@Body() createRewardDto : CreateRewardDto, @Request() req){
        return this.rewardsService.create(createRewardDto, req.user);
    }

    @Post('/claim/:id')
    claimReward(@Param('id') id : string, @Request() req){
        return this.rewardsService.claimReward(+id, req.user);
    }

    @Patch(':id')
    update(@Param('id') id : string, updateRewardDto : UpdateRewardDto){
        return this.rewardsService.update(+id,updateRewardDto);
    }

    @Delete(':id')
    delete(@Param('id') id : string){
        return this.rewardsService.delete(+id);
    }
}
