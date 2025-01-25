import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(private userService : UserService, private jwtService: JwtService){}

    async validateUser(email : string, pass : string) : Promise<User>{
        const user = await this.userService.findOneByEmail(email);
        if(!user){
            throw new BadRequestException("User not found");
        }
        const isMatch : boolean = bcrypt.compareSync(pass, user.password);
        if(!isMatch){
            throw new BadRequestException("Password does not match");
        }
        return user
    }
    async login(user : User){
        const payload = {email : user.email, sub : user.userId};
        return { access_token : this.jwtService.sign(payload)};
    }
    async register(user : CreateUserDto){
        const existingUser = await this.userService.findOneByEmail(user.email);
        if(existingUser){
            throw new BadRequestException('email already exists!');
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword
        const newUser = await this.userService.create(user);
        return this.login(newUser);
    }
}
