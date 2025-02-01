import { Category } from "src/categories/entities/category.entity";
import { Points } from "src/points/entities/points.entity";
import { Reward } from "src/rewards/entities/reward.entity";
import { Task } from "src/task/entities/task.entity";
import { RewardTransaction } from "src/transactions/entities/transaction.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";

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

    @OneToMany(() => Reward, reward => reward.user, {cascade : true})
    rewards : Reward[]

    @OneToMany(() => RewardTransaction, rewardTransaction => rewardTransaction.user, {cascade : true})
    rewardTransactions : RewardTransaction[]

    @OneToOne(() => Points, points => points.user)
    points : Points[]
}
