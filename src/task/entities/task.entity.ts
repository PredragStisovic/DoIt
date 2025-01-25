import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


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
}
