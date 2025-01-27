import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JWTAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@UseGuards(JWTAuthGuard)
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService : CategoriesService){}
    @Post()
      async create(@Body() createCategoryDto : CreateCategoryDto, @Request() req) {
        const category = await this.categoriesService.create(createCategoryDto, req.user);
        return category;
      }
    
      @Get()
      findAll(@Request() req) {
        return this.categoriesService.findAll(req.user);
      }
    
      @Get(':id')
      findOne(@Param('id') id: string) {
        return this.categoriesService.findOne(+id);
      }
    
      @Patch(':id')
      update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoriesService.update(+id, updateCategoryDto);
      }
    
      @Delete(':id')
      remove(@Param('id') id: string) {
        return this.categoriesService.remove(+id);
      }
}
