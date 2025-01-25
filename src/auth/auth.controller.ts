import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { JWTAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){}
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req){
        return this.authService.login(req.user);
    }
    @Post('register')
    async register(@Body() registerBody : CreateUserDto){
        return await this.authService.register(registerBody);
    }
    @UseGuards(JWTAuthGuard)
    @Get('profile')
    getProfile(@Request() req){
        return req.user;
    }

}
