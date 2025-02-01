import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
    constructor(
        private readonly transactionsService : TransactionsService
    ){}
    @UseGuards(JWTAuthGuard)
    @Get()
    findUsersTransactions(user : User){
        return this.transactionsService.findUsersTransactions(user);
    }

}
