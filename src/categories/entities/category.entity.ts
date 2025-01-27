import { TaskCategory } from "src/task_category/entities/task_category.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    categoryId : number;

    @Column()
    name : string;

    @ManyToOne(() => User, user => user.categories)
    user : User

    @OneToMany(() => TaskCategory, taskCategory => taskCategory.category, {cascade : true})
    taskCategories : TaskCategory[]
}