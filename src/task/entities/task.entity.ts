import { Notification } from "src/notification/entities/notification.entity";
import { TaskCategory } from "src/task_category/entities/task_category.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    taskId : number

    @Column()
    title : string

    @Column({
        default : ""
    })
    description : string

    @Column()
    points : number

    @Column()
    completed : boolean

    @Column({
        nullable: true
    }
    )
    dueDate : Date

    @Column()
    createdAt : Date

    @ManyToOne(() => User, (user) => user.tasks, {onDelete : 'CASCADE'})
    user : User

    @OneToMany(() => TaskCategory, taskCategory => taskCategory.task, {cascade : true})
    taskCategories : TaskCategory[]

    @OneToMany(() => Notification, notification => notification.task, {cascade : true})
    notifications : Notification[]
}
