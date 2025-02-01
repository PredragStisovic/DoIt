import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { Task } from 'src/task/entities/task.entity';
import { PointsService } from 'src/points/points.service';
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository : Repository<User>,
    private readonly pointsService : PointsService,
    private readonly dataSource : DataSource
  ){}

  async create(user: CreateUserDto) {
    const savedUser = await this.userRepository.save(user);
    const points = this.pointsService.create(savedUser);
    return savedUser;
  }

  async findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({userId : id});
  }
  findOneByEmail(email : string){
    return this.userRepository.findOneBy({email : email});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.dataSource
      .createQueryBuilder()
      .update(User)
      .set({password : updateUserDto.password})
      .where("userId = :id", {userId : id})
      .execute()
  }
  async remove(id: number) {
    await this.userRepository.delete(id);
  }
}
