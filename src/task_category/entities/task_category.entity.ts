import { Category } from "src/categories/entities/category.entity";
import { Task } from "src/task/entities/task.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TaskCategory {
    @PrimaryGeneratedColumn()
    category_task_id : number;

    @ManyToOne(() => Task, task => task.taskCategories, { onDelete : 'CASCADE'})
    @JoinColumn({name : 'task_id'})
    task : Task;

    @ManyToOne(() => Category, category => category.taskCategories, {onDelete : 'CASCADE'})
    @JoinColumn({name : 'category_id'})
    category : Category
}
