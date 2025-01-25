import { Injectable } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository : Repository<Category>,
      ){}
      create(createCategoryDto: CreateCategoryDto, user : User) {
        const category = new Category();
        category.name = createCategoryDto.name;
        category.user = user;
        return this.categoryRepository.save(category);
      }
    
      async findAll(req_user : User) {
        return this.categoryRepository.find({
          relations : {
            user : true
          },
          where: {
            user : {
              userId : req_user.userId
            }
          }
        });
      }
    
      findOne(id: number) {
        return this.categoryRepository.findOneBy({categoryId : id});
      }
    
      async update(id: number, updateCategoryDto: UpdateCategoryDto) {
        const category = await this.categoryRepository.findOneBy({categoryId:id});
        if(updateCategoryDto.name != null){
          category.name = updateCategoryDto.name
        }
        return this.categoryRepository.save(category)
      }
    
      remove(id: number) {
        this.categoryRepository.delete(id);
      }
}
