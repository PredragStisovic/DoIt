import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    categoryId : number;

    @Column()
    name : string;

    @ManyToOne(() => User, user => user.categories)
    user : User
}