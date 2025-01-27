import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Points{
    @PrimaryGeneratedColumn()
    pointsId : number

    @Column()
    total_points : number

    @Column()
    earned_points : number

    @Column()
    spent_points : number

    @OneToOne(() => User, user => user.points, {onDelete : 'CASCADE'})
    @JoinColumn()
    user : User
}