import { Reward } from "src/rewards/entities/reward.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class RewardTransaction{
    @PrimaryGeneratedColumn()
    transaction_id : number

    @Column()
    points_spent : number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    redeemed_at: Date;

    @ManyToOne(() => User, user => user.rewardTransactions, {onDelete : 'CASCADE'})
    user : User;

    @ManyToOne(() => Reward, reward => reward.rewardTransactions)
    reward : Reward
}