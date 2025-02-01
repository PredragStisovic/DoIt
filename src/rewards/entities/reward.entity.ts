import { RewardTransaction } from "src/transactions/entities/transaction.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reward{
    @PrimaryGeneratedColumn()
    rewardId : number

    @Column()
    name : string

    @Column({
        nullable : true
    })
    description : string

    @Column()
    cost : number

    @ManyToOne(() => User, user => user.rewards, { onDelete : 'CASCADE'})
    user : User;

    @OneToMany(() => RewardTransaction, rewardTransaction => rewardTransaction.reward)
    rewardTransactions : RewardTransaction[]
}