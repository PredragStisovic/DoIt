import { Task } from "src/task/entities/task.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


export enum statusEnum{

}

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    notificationId : number

    @Column()
    notification_time : Date

    @Column()
    message : string

    @Column()
    isRead : boolean

    @ManyToOne(() => Task, task => task.notifications, { onDelete : 'CASCADE'})
    @JoinColumn({name : 'task_id'})
    task : Task;
}
