import { Category } from "src/categories/entities/category.entity";
import { Points } from "src/points/entities/points.entity";
import { Task } from "src/task/entities/task.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId : number

    @Column()
    name : string

    @Column()
    email : string

    @Column()
    password : string

    @OneToMany(() => Task, (task) => task.user, {cascade : true})
    tasks : Task[]

    @OneToMany(() => Category, category => category.user, {cascade : true})
    categories : Category[]

    @OneToOne(() => Points, points => points.user)
    points : Points[]
}
